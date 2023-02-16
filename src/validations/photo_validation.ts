/** User Validation Rules **/

import { body } from 'express-validator'

export const createPhotoRules = [

	body('title').isString().isLength({ min: 3 }).withMessage('Has to be a string with at least 3 characters long'),
	body('url').isURL().withMessage('Has to be a correct URL address'),
	body('comment').optional().isString().isLength({ min: 3}).withMessage('Has to be a string with at least 3 characters long')

]

export const updatePhotoRules = [

	body('photo_id').isInt(),
	body('title').optional().isString().isLength({ min: 3 }).withMessage('Has to be a string with at least 3 characters long'),
	body('url').optional().isURL(),
	body('comment').optional().isString().isLength({ min: 3}).withMessage('Has to be a string with at least 3 characters long')

]
