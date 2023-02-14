/** Album Service **/

import prisma from "../prisma"

/**
 * Get all albums
 */
export const getAllAlbums = async () => {

	return await prisma.album.findMany()

}

/**
 * Get a single album by id
 * @param id Album Id
 */
export const getAlbumById = async (id : number) => {

	return await prisma.album.findUniqueOrThrow({
		where: {
			id
		},
		include: {
			photos: true
		}
	})
}

/**
 * Create an album
 * @param data Data to create a new author
 */
export const createAlbum = async (data : ) => {
	return await prisma.album.create({data})
}

/**
 * Update album by id
 */
export const updateAlbum = async (id : number, data : ) => {

	return await prisma.album.update({
		where: {
			id
		},
		data
	})
}

/**
 * Delete an author by id
 * @param id authorId
 */
export const deleteAuthor = async (id : number) => {

	return await prisma.author.delete({
		where: { id }
	})

}
