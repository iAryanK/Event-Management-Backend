import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import * as userService from '../../user/user.service'
import createHttpError from 'http-errors'
import expressAsyncHandler from 'express-async-handler'
import { IUser } from '../../user/user.dto'

export const authenticate = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.replace('Bearer ', '')

        if (!token) {
            throw createHttpError(401, {
                message: `Invalid token`,
            })
        }

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: string
        }
        if (!decodedUser) {
            throw createHttpError(401, {
                message: `Invalid token`,
            })
        }

        const result = await userService.getUserById(decodedUser.id)
        if (!result) {
            throw createHttpError(401, {
                message: `Invalid token`,
            })
        }

        const { password, ...user } = result
        req.user = user

        next()
    }
)

export const onlyAdmin = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw createHttpError(401, {
                message: 'Authentication required',
            })
        }

        if (req.user.role !== 'ADMIN') {
            throw createHttpError(403, {
                message: 'Access denied. Admin privileges required.',
            })
        }

        next()
    }
)
