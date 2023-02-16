import { JwtPayload } from "../../types"
import { User } from "@prisma/client"

declare global {
	namespace Express {
		export interface Request {
			token?: JwtPayload,
			user?: User
		}
	}
}
