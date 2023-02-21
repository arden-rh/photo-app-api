/** Album Router **/
import express from 'express'
import { index, show, store, update, addPhotos, destroy, removePhoto } from '../controllers/album_controller'
import { addPhotosToAlbumRules, createAlbumRules, updateAlbumRules } from '../validations/album_validation'

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
router.patch('/:albumId', updateAlbumRules, update)

/**
 * POST /albums/:albumId/photos 
 */
router.post('/:albumId/photos', addPhotosToAlbumRules, addPhotos)

/**
 * DELETE /albums/:albumId
 */
router.delete('/:albumId', destroy)

/**
 * DELETE /albums/:albumId/photos/:photoId
 */
router.delete('/:albumId/photos/:photoId', removePhoto)

export default router
