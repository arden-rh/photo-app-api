/** User Validation Rules **/

import { body } from 'express-validator'

export const createAlbumRules = [

	body('title').trim().isString().withMessage('Has to be a string').bail().isLength({ min: 3 }).withMessage('Has to be at least 3 characters long')

]

export const addPhotosToAlbumRules = [

	body('photo_id').trim().custom( async data => {
		if (data.isInt || data.isArray ) {
			return data
		}
	} )
]
