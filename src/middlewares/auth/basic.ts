/** HTTP Basic Authorization Middleware **/

import bcrypt from "bcrypt"
import Debug from "debug"
import { Response, Request, NextFunction } from "express"

const debug = Debug("prisma-books:basic")

/**
 * Basic auth middleware
 * @param req
 * @param res
 * @param next
 */
export const basic = async (req : Request, res : Response, next : NextFunction) => {

	// check for auth header or ❌
	debug(req.headers)

	if (!req.headers.authorization) {
		debug("Authorization header missing")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required"
		})
	}

	// split auth header
	const [authSchema, base64Payload] = req.headers.authorization.split(" ")


	// check that auth schema is basic or ❌
	if (authSchema.toLowerCase() !== "basic") {
		debug("Authorization schema isn't Basic")

		return res.status(401).send({
			status: "fail",
			data: "Wrong authorization method"
		})
	}

	// decode credentials to ascii
	const decodedPayload = Buffer.from(base64Payload, "base64").toString("ascii")

	// split credentials on colon
	const [email, password] = decodedPayload.split(":")

	// get user from database or ❌
	// const user = await getUserByEmail(email)

/* 	if (!user) {
		debug("User %s does not exist in database", email)

		return res.status(401).send({
			status: "fail",
			data: "Authorization required"
		})
	} */

	// verify hash against credentials or ❌
	// debug("user", user)

	// const result = await bcrypt.compare(password, user.password)

/* 	if (!result) {
		debug("Password for user %s didn't match", email)

		return res.status(401).send({
			status: "fail",
			data: "Authorization required"
		})
	} */

	// attach user to req.user ( added key to Request)
	// req.user = user

	// all ok ✅
	next()
}
