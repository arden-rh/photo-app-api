/** Photo Service **/

import prisma from "../prisma"
import { CreatePhotoData, UpdatePhotoData } from "../types"

/**
 * Get all photos
 */
export const getAllPhotos = async ( id : number) => {

	return await prisma.photo.findMany({ 
		where: { user_id: id},
		select: {
			id: true,
			title: true,
			url: true,
			comment: true,
			user_id: false
		}
	})

}

/**
 * Get a single photo by id
 * @param id Photo Id
 */
export const getPhotoById = async (id : number) => {

	return await prisma.photo.findUniqueOrThrow({
		where: {
			id
		},
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
export const updatePhoto = async (id : number, data : UpdatePhotoData) => {

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
