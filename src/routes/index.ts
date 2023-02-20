import express from "express"
import { login, refresh, register } from "../controllers/user_controller"
import { validateToken } from "../middlewares/auth/jwt"
import { createUserRules } from "../validations/user_validation"
import albums from './album_routes'
import photos from './photo_routes'

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "This is an API"
	})
})

/**
 * Albums /albums
 */
router.use('/albums', validateToken, albums)

/**
 * Photos /photos
 */
router.use('/photos', validateToken, photos)

/**
 * Register a user /register
 */
router.post('/register', createUserRules, register)

/**
 * Login a user /login
 */
router.post('/login', login)

/**
 * Get a refresh token /refresh
 */
router.post('/refresh', refresh)

export default router
