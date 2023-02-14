/**
 * User Controller
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('prisma-boilerplate:photo_controller')

/**
 * Register a user
 */
export const register = async (req: Request, res: Response) => {
}

/**
 * Login a user
 */
export const login = async (req: Request, res: Response) => {
}

/**
 * Refresh a user
 */
export const refresh = async (req: Request, res: Response) => {
}
