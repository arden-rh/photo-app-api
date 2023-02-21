/** Photo Validation Rules **/

import { body } from 'express-validator'

export const createPhotoRules = [

	body('title').trim().isString().isLength({ min: 3 }).withMessage('Has to be a string with at least 3 characters long'),
	body('url').trim().isURL().withMessage('Has to be a correct URL address'),
	body('comment').trim().optional().isString().isLength({ min: 3 }).withMessage('Has to be a string with at least 3 characters long')

]

export const updatePhotoRules = [

	body('title').trim().optional().isString().isLength({ min: 3 }).withMessage('Has to be a string with at least 3 characters long'),
	body('url').trim().optional().isURL().withMessage('Has to be a correct URL address'),
	body('comment').trim().optional().isString().isLength({ min: 3 }).withMessage('Has to be a string with at least 3 characters long')

]
