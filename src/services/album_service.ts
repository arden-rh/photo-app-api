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
 * Add photo to album
 */

export const addPhotoToAlbum = async (albumId : number, photoId : number) => {

	return await prisma.album.update({
		where: {
			id: albumId
		},
		data: {
			photos: {
				connect: {
					id: photoId
				}
			}
		}
	})

}

/**
 * Add photo to album
 */

export const addPhotosToAlbum = async (albumId : number, photoIds : Array<object>) => {

	
	return await prisma.album.update({
		where: {
			id : albumId
		},
		data: {
			photos: {
				connect: photoIds
			}
		}
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
