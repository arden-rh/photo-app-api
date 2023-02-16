/** Album Service **/

import prisma from "../prisma"
import { CreateAlbumData, UpdateAlbumData } from "../types"

/**
 * Get all albums
 */
export const getAllAlbums = async (id : number) => {

	return await prisma.album.findMany({ where: {user_id: id} })

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
	return await prisma.album.create({data})
}

/**
 * Update album by id
 */
export const updateAlbum = async (id : number, data : UpdateAlbumData) => {

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
