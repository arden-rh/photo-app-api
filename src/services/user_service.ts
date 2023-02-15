/* User Service */

import prisma from "../prisma"
import { CreateUserData } from "../types"

/**
 * Get all users
 */
export const getAllUsers = async () => {
	return await prisma.user.findMany()
}

/**
 * Get a single user by email
 * @param email User email
 * @returns
 */
export const getUserByEmail = async (email: string) => {
	return await prisma.user
		.findUnique({ where: { email } })
}

/**
 * Get a single user by id
 * @param id User Id
 * @returns
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
 *
 * @param data validated data
 * @returns
 */
export const createUser = async (data : CreateUserData) => {

	return await prisma.user.create({data})
}

/**
 * Delete a single user by id
 * @param id userId
 */
export const deleteUser = async (id: number) => {

	return await prisma.user.delete({
		where: { id }
	})
}


