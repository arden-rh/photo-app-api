/** Album Service **/

import prisma from "../prisma"
import { AddPhotoToAlbumData, CreateAlbumData, UpdateAlbumData } from "../types"

/**
 * Get all albums
 * @param id User Id
 */
export const getAllAlbums = async (id: number) => {

	return await prisma.album.findMany({
		where: {
			user_id: id 
		}
	})
}

/**
 * Get a single album by id
 * @param id albumId
 */
export const getAlbumById = async (id: number) => {

	return await prisma.album.findUniqueOrThrow({
		where: {
			id: id
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
export const createAlbum = async (data: CreateAlbumData) => {
	return await prisma.album.create({ data })
}

/**
 * Update album by id
 * @param id albumId
 * @param data Data to update album
 */
export const updateAlbum = async (id: number, data: UpdateAlbumData) => {

	return await prisma.album.update({
		where: {
			id
		},
		data
	})
}

/**
 * Add photo to album
 * @param albumId
 * @param photoId
 */

export const addPhotoToAlbum = async (albumId: number, photoId: number) => {

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
 * @param albumId
 * @param photoIds Array of { id : number }
 */

export const addPhotosToAlbum = async (albumId: number, photoIds: Array<AddPhotoToAlbumData>) => {

	return await prisma.album.update({
		where: {
			id: albumId
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
 * @param id albumId
 */
export const deleteAlbum = async (id: number) => {

	return await prisma.album.delete({
		where: { id }
	})
}

/**
 * Remove single photo from album
 * @param albumId 
 * @param photoId 
 */
export const removePhotoFromAlbum = async (albumId: number, photoId: number) => {

	return await prisma.album.update({
		where: { id: albumId },
		data: {
			photos: {
				disconnect: { id: photoId }
			}
		}
	})
}
