/** User Validation Rules **/

import { body } from 'express-validator'

export const createAlbumRules = [

	body('title').isString().withMessage('Has to be a string').bail().isLength({ min: 3 }).withMessage('Has to be at least 3 characters long')

]

export const addPhotoToAlbumRules = [

	body('photo_id').isInt()
]
