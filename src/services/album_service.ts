/** Album Service **/

import prisma from "../prisma"
import { CreateAlbumData } from "../types"

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
 * @param data Data to create a new album
 */
export const createAlbum = async (data : CreateAlbumData) => {
	return await prisma.album.create({
		data: {
			title: data.title
		}
	})
}

/**
 * Update album by id
 */
export const updateAlbum = async (id : number, data : CreateAlbumData) => {

	return await prisma.album.update({
		where: {
			id
		},
		data
	})
}

/**
 * Delete an album by id
 * @param id albumrId
 */
export const deleteAlbum = async (id : number) => {

	return await prisma.album.delete({
		where: { id }
	})

}
