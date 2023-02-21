/** User Service **/

import prisma from "../prisma"
import { CreateUserData } from "../types"

/**
 * Get a single user by email
 * @param email User email
 */
export const getUserByEmail = async (email: string) => {
	return await prisma.user
		.findUnique({ where: { email } })
}

/**
 * Get a single user by id
 * @param id User Id
 */
export const getUserById = async (id: number) => {

	return await prisma.user.findUniqueOrThrow({
		where: {
			id
		}
	})
}

/**
 * Create a new user
 * @param data validated data
 */
export const createUser = async (data : CreateUserData) => {

	return await prisma.user.create({data})
}

