/**
 * Photo Controller
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'
import { getAllPhotos } from '../services/photo_services'

// Create a new debug instance
const debug = Debug('uppgift-02:photo_controller')

/**
 * Get all photos
 */
export const index = async (req: Request, res: Response) => {

    try {
		const photos = await getAllPhotos()
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
}

/**
 * Create a photo
 */
export const store = async (req: Request, res: Response) => {
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