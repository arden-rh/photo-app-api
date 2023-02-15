/** User Validation Rules **/

import { body } from 'express-validator'
import { getUserByEmail } from '../services/user_service'

export const createUserRules = [

	body('email').isEmail().withMessage('You need to write a valid email address').custom(async email => {

		const user = await getUserByEmail(email)

		if (user) {
			return Promise.reject('Email already exists')
		}
	}),
	body('password').isString().isLength({ min: 6 }).withMessage('Your password has to be at least 6 characters long'),
	body('first_name').isString().withMessage('Has to be a string').bail().isLength({ min: 3 }).withMessage('Has to be at least 3 characters long'),
	body('last_name').isString().withMessage('Has to be a string').bail().isLength({ min: 3 }).withMessage('Has to be at least 3 characters long')

]
