/**
 * Album Controller
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import prisma from '../prisma'
import { addPhotoToAlbum, createAlbum, getAlbumById, getAllAlbums, updateAlbum } from '../services/album_service'
import { getUserByEmail } from '../services/user_service'

// Create a new debug instance
const debug = Debug('uppgift-02:album_controller')

/**
 * Get all albums
 */
export const index = async (req: Request, res: Response) => {

	const user = await getUserByEmail(req.token!.email)

    try {
		const albums = await getAllAlbums(user!.id)

		res.status(200).send({
			status: "success",
			data: albums
		})
	} catch (err) {
        debug("Error thrown when finding albums", err)
		res.status(500).send({ status: "error", message: "Error when trying to find all albums" })
	}
}

/**
 * Get a single album
 */
export const show = async (req: Request, res: Response) => {

	const user = await getUserByEmail(req.token!.email)

	const albumId = Number(req.params.albumId)

	try {
		const album = await getAlbumById(albumId)

		if (album.user_id !== user!.id) {
			res.status(401).send({
				status: "fail",
				data: "Not authorised access"
			})
			return
		}

		res.status(200).send({
			status: "success",
			data: album
		})
	} catch (err) {
		debug("Error thrown when finding the album %s", err)
		res.status(500).send({ status: "error", message: `Error when trying to find the album with id ${req.params.albumId}`})
	}
}

/**
 * Create an album
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

		const album = await createAlbum({
			title: data.title,
			user_id: user!.id
		})

		res.status(201).send({
			status: "success",
			data: album
		})
	} catch (err) {
		debug("Error thrown when creating an album %o : %o", data, err)
		res.status(500).send({ status: "error", message: "Error thrown when trying to create an album."})
	}

}

/**
 * Update an album
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

	const user = await getUserByEmail(req.token!.email)

	const albumId = Number(req.params.albumId)

	try {

		const album = await updateAlbum(albumId, data)

		if (album.user_id !== user!.id) {
			res.status(401).send({
				status: "fail",
				data: "Not authorised access"
			})
			return
		}

		res.status(201).send({
			status: "success",
			data: album
		})
	} catch (err) {
		debug("Error thrown when updating the album %o : %o", data.id, err)
		res.status(500).send({ status: "error", message: `Error thrown when trying to update album ${data.id}`})
	}

}

/**
 * Add a photo to album
 */
export const addPhoto = async (req : Request, res : Response) => {

	const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array()
		});
	}

    const data = matchedData(req)

	const user = await getUserByEmail(req.token!.email)

	const albumId = Number(req.params.albumId)
    
	const photoId = data.photo_id

	const photo = await prisma.photo.findFirstOrThrow(photoId)

	console.log(photo.id)

	try {

		const result = await addPhotoToAlbum(albumId, photoId)

		if (result.user_id !== user!.id) {
			res.status(401).send({
				status: "fail",
				data: "Not authorised access"
			})
			return
		}

		// const photo = await prisma.photo.findFirstOrThrow(photoId)

		res.status(201).send({
			status: "success",
			data: result
		})
	} catch (err) {
		debug("Error thrown when adding photo %o to an album %o: %o", photoId, albumId, err)
		res.status(500).send({ 
			status: "error",
			message: `Error thrown when adding photo ${photoId} to album ${albumId}.`})
	}

}

/**
 * Add multiple photos to album
 */
export const addPhotos = async (req : Request, res : Response) => {
    
}

/**
 * Delete an album
 */
export const destroy = async (req: Request, res: Response) => {
}

/**
 * Remove a single photo from an album
 */
export const removePhoto = async (req : Request, res : Response) => {
    
}