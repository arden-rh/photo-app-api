/** JWT Authentication Middleware **/

import Debug from "debug"
import { Response, Request, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { JwtPayload } from "../../types"


const debug = Debug("uppgift-02:jwt")

/**
 * Validate access token
 *
 * Authorization: Bearer <token>
 */
export const validateToken = (req: Request, res: Response, next: NextFunction) => {
	debug("Running JWT validation")

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

	// validate token and attach payload to request or ❌
	try {

		const payload = (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "") as unknown) as JwtPayload
		debug("Package: %o", payload)

		req.token = payload

	} catch (err) {
		debug("Token failed verification", err)

		return res.status(401).send({
			status: "fail",
			data: "Authorization required"
		})
	}

	next()
}

