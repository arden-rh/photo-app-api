/** Album Controller **/
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import prisma from '../prisma'
import { addPhotosToAlbum, createAlbum, deleteAlbum, getAlbumById, getAllAlbums, removePhotoFromAlbum, updateAlbum } from '../services/album_service'

// Create a new debug instance
const debug = Debug('uppgift-02:album_controller')

/**
 * Get all albums
 */
export const index = async (req: Request, res: Response) => {

	try {
		const albums = await getAllAlbums(req.token.id)

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

	const albumId = Number(req.params.albumId)

	try {
		const album = await getAlbumById(albumId)

		if (album.user_id !== req.token.id) {
			res.status(401).send({
				status: "fail",
				data: "No authorised access"
			})
			return
		}

		res.status(200).send({
			status: "success",
			data: {
				id: album.id,
				title: album.title,
				photos: album.photos

			}
		})
	} catch (err) {
		debug("Error thrown when finding the album %s", err)
		res.status(500).send({ status: "error", message: `Error when trying to find the album with id ${req.params.albumId}` })
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

	try {

		const album = await createAlbum({
			title: data.title,
			user_id: req.token.id
		})

		res.status(201).send({
			status: "success",
			data: album
		})
	} catch (err) {
		debug("Error thrown when creating an album %o : %o", data, err)
		res.status(500).send({ status: "error", message: "Error thrown when trying to create an album." })
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

	const albumId = Number(req.params.albumId)

	try {

		const album = await getAlbumById(albumId)

		if (album.user_id !== req.token.id) {
			res.status(401).send({
				status: "fail",
				data: "No authorised access"
			})
			return
		}

		const updatedAlbum = await updateAlbum(albumId, data)

		res.status(201).send({
			status: "success",
			data: updatedAlbum
		})
	} catch (err) {
		debug("Error thrown when updating the album %o : %o", data.id, err)
		res.status(500).send({ status: "error", message: `Error thrown when trying to update album ${data.id}` })
	}

}


/**
 * Add photo or photos to album
 */
export const addPhotos = async (req: Request, res: Response) => {

	const validationErrors = validationResult(req)

	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array()
		})
	}

	const data = matchedData(req)

	const albumId = Number(req.params.albumId)

	try {

		const album = await getAlbumById(albumId)

		if (album.user_id !== req.token.id) {
			res.status(401).send({
				status: "fail",
				data: "No authorised access"
			})
			return
		}

		const userPhotosIds = await prisma.photo.findMany({ where: { user_id: req.token.id }, select: { id: true } })

		if (!data.photo_id.every((photo: number) => userPhotosIds
			.map(photo => photo.id)
			.includes(photo))) {
			res.status(400).send({
				status: "fail",
				data: "Unable to add photos to album"
			})
			return
		}

		const photoIdObjects = (data.photo_id).map((photoId: number) => {
			return {
				id: photoId
			}
		})

		const result = await addPhotosToAlbum(albumId, photoIdObjects)

		res.status(200).send({
			status: "success",
			data: `Photo(s) with id: ${data.photo_id.join(", ")} was successfully added to album ${result.title}`
		})
	} catch (err) {
		debug("Error thrown when adding photos %o to album %o: %o", data.photo_id, albumId, err)
		res.status(500).send({
			status: "error",
			message: `Error thrown when adding photos ${data.photo_id} to album ${albumId}.`
		})
	}

}

/**
 * Delete an album
 */
export const destroy = async (req: Request, res: Response) => {

	const albumId = Number(req.params.albumId)

	try {

		const album = await getAlbumById(albumId)

		if (album.user_id !== req.token.id) {
			res.status(401).send({
				status: "fail",
				data: "No authorised access"
			})
			return
		}

		await deleteAlbum(albumId)

		res.status(200).send({ status: "success", data: `Album ${album.title} deleted` })

	} catch (err) {
		debug("Error thrown when trying to delete album %o: %o", albumId, err)
		res.status(500).send({
			status: "error",
			message: `Error thrown when deleting album ${albumId}.`
		})
	}
}

/**
 * Remove a single photo from an album
 */
export const removePhoto = async (req: Request, res: Response) => {

	const albumId = Number(req.params.albumId)

	const photoId = Number(req.params.photoId)

	try {

		const album = await getAlbumById(albumId)

		if (album.user_id !== req.token.id) {
			res.status(401).send({
				status: "fail",
				data: "No authorised access"
			})
			return
		}

		const photo = await prisma.photo.findFirstOrThrow({
			where: {
				id: photoId,
			},
			include: {
				albums: {
					where: {
						id: albumId
					}
				}
			}
		})

		if (photo.albums.length === 0) {
			res.status(404).send({
				status: "error",
				message: "Could not find photo to remove."
			})
			return
		}

		await removePhotoFromAlbum(albumId, photoId)

		res.status(200).send({ status: "success", data: `Photo with id ${photoId} was removed from album ${album.title}` })

	} catch (err) {
		debug("Error thrown when trying to remove photo %o from album %o: %o", photoId, albumId, err)
		res.status(500).send({
			status: "error",
			message: `Error thrown when removing photo from album ${albumId}.`
		})
	}
}