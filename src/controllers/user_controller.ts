/**
 * User Controller
 */
import bcrypt from 'bcrypt'
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import prisma from '../prisma'
import { JwtPayload } from '../types'
import { createUser, getUserByEmail } from './../services/user_service'

// Create a new debug instance
const debug = Debug('prisma-boilerplate:photo_controller')

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
        res.status(201).send({ status: "success", data: {
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
}

/**
 * Refresh a user
 */
export const refresh = async (req: Request, res: Response) => {
}
