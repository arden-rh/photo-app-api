/** User Validation Rules **/

import { body } from 'express-validator'

export const createAlbumRules = [

	body('title').trim().isString().isLength({ min: 3 }).withMessage('Has to be a string with at least 3 characters long')

]

export const updateAlbumRules = [

	body('title').optional().trim().isString().withMessage('Has to be a string with at least 3 characters long')

]

export const addPhotosToAlbumRules = [

	body('photo_id').custom( async data => {
		if (data.isInt || data.isArray ) {
			return data
		}
	} )
]
