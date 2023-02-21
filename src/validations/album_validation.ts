/** Album Validation Rules **/

import { body } from 'express-validator'

export const createAlbumRules = [

	body('title').trim().isString().isLength({ min: 3 }).withMessage('The value has to be a string with at least 3 characters long')

]

export const updateAlbumRules = [

	body('title').optional().trim().isString().withMessage('The value has to be a string with at least 3 characters long')

]

export const addPhotosToAlbumRules = [

	body('photo_id').toArray().isArray({ min : 1 }).withMessage('The value must be an Array with numbers'),
	body('photo_id.*').isInt().withMessage('The values inside the Array must be numbers')

]
