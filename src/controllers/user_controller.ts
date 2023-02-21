/** User Controller **/
import bcrypt from 'bcrypt'
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types'
import { createUser, getUserByEmail } from './../services/user_service'

// Create a new debug instance
const debug = Debug('uppgift-02:photo_controller')

/**
 * Register a user
 */
export const register = async (req: Request, res: Response) => {
    // Check for any validation errors
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            status: "fail",
            data: validationErrors.array(),
        })
    }

    // Get only the validated data from the request
    const validatedData = matchedData(req)

    // Calculate a hash + salt for the password
    const hashedPassword = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10)
    console.log("Hashed password:", hashedPassword)

    // Replace password with a hashed password
    validatedData.password = hashedPassword

    // Store the user in the database
    try {
        const user = await createUser({
            email: validatedData.email,
            password: validatedData.password,
            first_name: validatedData.first_name,
            last_name: validatedData.last_name
        })

        // Respond with 201 Created 
        res.status(200).send({
            status: "success", data: {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            }
        })

    } catch (err) {
        return res.status(500).send({ status: "error", message: "Could not create user in database" })
    }
}

/**
 * Login a user
 */
export const login = async (req: Request, res: Response) => {

    // get email and password from request body
    const { email, password } = req.body

    // find user by email
    const user = await getUserByEmail(email)
    if (!user) {
        return res.status(404).send({
            status: "fail",
            message: "User not found"
        })
    }

    // verify credentials against hash
    const result = await bcrypt.compare(password, user.password)
    if (!result) {
        return res.status(401).send({
            status: "fail",
            message: "Authorization required"
        })
    }

    // construct payload
    const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
    }

    // sign payload with access-token secret and get access-token
    if (!process.env.ACCESS_TOKEN_SECRET) {
        return res.status(500).send({
            status: "error",
            message: "Access token secret undefined"
        })
    }

    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '4h'
    })

    // sign payload with refresh-token secret and get refresh-token
    if (!process.env.REFRESH_TOKEN_SECRET) {
        return res.status(500).send({
            status: "error",
            message: "Refresh token secret undefined"
        })
    }
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_LIFETIME || '1d'
    })

    // respond with access- and refresh-token
    res.status(200).send({
        status: "success",
        data: {
            access_token,
            refresh_token,
        }
    })
}

/**
 * Refresh a user
 */
export const refresh = async (req: Request, res: Response) => {

    // check for auth header or ❌
    if (!req.headers.authorization) {
        debug("Authorization header missing")

        return res.status(401).send({
            status: "fail",
            data: "Authorization required"
        })
    }

    // split auth header
    const [authSchema, token] = req.headers.authorization.split(" ")

    // check that auth schema is bearer or ❌
    if (authSchema.toLowerCase() !== "bearer") {
        debug("Authorization schema isn't Bearer")

        return res.status(401).send({
            status: "fail",
            data: "Wrong authorization method"
        })
    }

    // Verify refresh-token and get refresh-token payload
    try {

        const payload = (jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "") as unknown) as JwtPayload
        debug("Package: %o", payload)

        delete payload.iat
        delete payload.exp

        // Issue a new access token
        if (!process.env.ACCESS_TOKEN_SECRET) {

            return res.status(500).send({
                status: "error",
                message: "Refresh token undefined"
            })
        }

        const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "1d"
        })

        res.status(200).send({
            status: "success",
            data: {
                access_token
            }
        })

    } catch (err) {
        debug("Token failed verification", err)

        return res.status(401).send({
            status: "fail",
            data: "Authorization required"
        })
    }
}
