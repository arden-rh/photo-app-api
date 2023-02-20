/**
 * Photo Controller
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createPhoto, deletePhoto, getAllPhotos, getPhotoById, updatePhoto } from '../services/photo_services'
import { getUserByEmail } from '../services/user_service'

// Create a new debug instance
const debug = Debug('uppgift-02:photo_controller')

/**
 * Get all photos
 */
export const index = async (req: Request, res: Response) => {

    try {
		const photos = await getAllPhotos(req.token.id)

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

	const photoId = Number(req.params.photoId)

	try {
		const photo = await getPhotoById(photoId)

		if (photo.user_id !== req.token.id) {
			res.status(401).send({
				status: "fail",
				data: "No authorised access"
			})
			return
		}

		res.status(200).send({
			status: "success",
			data: {
				id: photo.id,
				title: photo.title,
				url: photo.url,
				comment: photo.comment
			}
		})
	} catch (err) {
		debug("Error thrown when finding a photo %s", err)
		res.status(500).send({ status: "error", message: `Error when trying to find the photo with id ${photoId}`})
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

	try {

		const photo = await createPhoto({
			title: data.title,
			url: data.url,
			comment: data.comment || null,
			user_id: req.token.id
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

		const validationErrors = validationResult(req)
	
		if (!validationErrors.isEmpty()) {
			return res.status(400).send({
				status: "fail",
				data: validationErrors.array()
			});
		}
	
		const data = matchedData(req)
	
		const photoId = Number(req.params.photoId)
	
		try {

			const photo = await getPhotoById(photoId)

			if (photo.user_id !== req.token.id) {
				res.status(401).send({
					status: "fail",
					data: "No authorised access"
				})
				return
			}
	
			const updatedPhoto = await updatePhoto(photoId, data)

			res.status(201).send({
				status: "success",
				data: updatedPhoto
			})
		} catch (err) {
			debug("Error thrown when updating the photo %o : %o", photoId, err)
			res.status(500).send({ status: "error", message: `Error thrown when trying to update photo ${photoId}`})
		}
}

/**
 * Delete a photo
 */
export const destroy = async (req: Request, res: Response) => {

	const photoId = Number(req.params.photoId)

	try {

		const photo = await getPhotoById(photoId)

		if (photo.user_id !== req.token.id) {
			res.status(401).send({
				status: "fail",
				data: "No authorised access"
			})
			return
		}

		await deletePhoto(photoId)

		res.status(200).send({ status: "success", data: `Photo ${photo.title} deleted` })

	} catch (err) {
		debug("Error thrown when trying to delete photo %o: %o", photoId, err)
		res.status(500).send({
			status: "error",
			message: `Error thrown when deleting photo ${photoId}.`
		})
	}

}