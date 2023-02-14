import express from "express"
import { login, refresh, register } from "../controllers/user_controller"
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
router.use('/albums', albums)

/**
 * Photos /photos
 */
router.use('/photos', photos)

/**
 * Register a user /register
 */
router.post('/register', register)

/**
 * Login a user /login
 */
router.post('/login', login)

/**
 * Get a refresh token /refresh
 */
router.post('/refresh', refresh)

export default router
