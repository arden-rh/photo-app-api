/**
 * Album Router
 */
import express from 'express'
import { index, show, store, update, addPhoto, addPhotos, destroy, removePhoto } from '../controllers/album_controller'
import { createAlbumRules } from '../validations/album_validation'

const router = express.Router()

/**
 * GET /albums
 */
router.get('/', index)

/**
 * GET /albums/:albumId
 */
router.get('/:albumId', show)

/**
 * POST /albums
 */
router.post('/', createAlbumRules, store)

/**
 * PATCH /albums/:albumId
 */
router.patch('/:albumId', createAlbumRules, update)

/**
 * POST /albums/:albumId/photos
 */
router.post('/:albumId/photos', addPhoto)

/**
 * POST /albums/:albumId/photos - add multiple photos
 */
router.post('/:albumId/photos', addPhotos)

/**
 * DELETE /albums/:albumId
 */
router.delete('/:albumId', destroy)

/**
 * DELETE /albums/:albumId/photos/:photoId
 */
router.delete('/:albumId/photos/:photoId', removePhoto)

export default router
