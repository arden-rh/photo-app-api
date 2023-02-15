/** Photo Service **/

import prisma from "../prisma"
import { CreatePhotoData } from "../types"

/**
 * Get all photos
 */
export const getAllPhotos = async () => {

	return await prisma.photo.findMany()

}

/**
 * Get a single photo by id
 * @param id Photo Id
 */
export const getPhotoId = async (id : number) => {

	return await prisma.photo.findUniqueOrThrow({
		where: {
			id
		}
	})
}

/**
 * Create a photo
 * @param data Data to create a new photo
 */
export const createPhoto = async (data : CreatePhotoData) => {
	return await prisma.photo.create({data})
}

/**
 * Update photo by id
 */
export const photoAlbum = async (id : number, data : CreatePhotoData) => {

	return await prisma.photo.update({
		where: {
			id
		},
		data
	})
}

/**
 * Delete an photo by id
 * @param id photoId
 */
export const deletePhoto = async (id : number) => {

	return await prisma.photo.delete({
		where: { id }
	})

}
