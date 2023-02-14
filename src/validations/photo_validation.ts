/** User Validation Rules **/

import { body } from 'express-validator'

export const createPhotoRules = [

	body('title').isString().withMessage('Has to be a string').bail().isLength({ min: 3 }).withMessage('Has to be at least 3 characters long'),
	body('url').isURL(),
	body('comment').optional().isString().isLength({ min: 3})

]
