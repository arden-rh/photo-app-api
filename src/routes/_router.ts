/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update, destroy } from '../controllers/_controller'
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
router.post('/', [], store)

/**
 * PATCH /resource/:resourceId
 */
router.patch('/:resourceId', [], update)

/**
 * DELETE /resource/:resourceId
 */
router.delete('/:resourceId', destroy)

export default router
