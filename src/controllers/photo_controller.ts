/**
 * Photo Controller
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import prisma from '../prisma'
import { createPhoto, getAllPhotos, getPhotoById } from '../services/photo_services'
import { getUserByEmail } from '../services/user_service'
import { createPhotoRules } from '../validations/photo_validation'

// Create a new debug instance
const debug = Debug('uppgift-02:photo_controller')

/**
 * Get all photos
 */
export const index = async (req: Request, res: Response) => {

	const user = await getUserByEmail(req.token!.email)

    try {
		const photos = await getAllPhotos(user!.id)

		res.status(200).send({
			status: "success",
			data: photos
		})
	} catch (err) {
        debug("Error thrown when finding photos", err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/**
 * Get a single photo
 */
export const show = async (req: Request, res: Response) => {

	const user = await getUserByEmail(req.token!.email)

	const photoId = Number(req.params.photoId)

	try {
		const photo = await getPhotoById(photoId)

		if (photo.user_id !== user!.id) {
			res.status(401).send({
				status: "fail",
				data: "Not authorised access"
			})
			return
		}

		res.status(200).send({
			status: "success",
			data: photo
		})
	} catch (err) {
		debug("Error thrown when finding a photo %s", err)
		res.status(500).send({ status: "error", message: `Error when trying to find the photo with id ${req.params.photoId}`})
	}
}

/**
 * Create a photo
 */
export const store = async (req: Request, res: Response) => {

	const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array()
		});
	}

    const data = matchedData(req)

	const user = await getUserByEmail(req.token!.email)

	try {

		const photo = await createPhoto({
			title: data.title,
			url: data.url,
			comment: data.comment || null,
			user_id: user!.id
		})

		res.status(201).send({
			status: "success",
			data: photo
		})
	} catch (err) {
		debug("Error thrown when creating a photo %o : %o", data, err)
		res.status(500).send({ status: "error", message: "Error thrown when trying to create a photo."})
	}

}

/**
 * Update a photo
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete a photo
 */
export const destroy = async (req: Request, res: Response) => {
}