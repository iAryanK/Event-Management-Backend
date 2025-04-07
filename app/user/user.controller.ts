import { type Request, type Response } from 'express'
import { createResponse } from '../common/helper/response.helper'
import asyncHandler from 'express-async-handler'
import * as userService from './user.service'
import { IUser } from './user.dto'
import {
    createUserTokens,
    decodeToken,
} from '../common/services/passport-jwt.service'
import createError from 'http-errors'
import passport from 'passport'
import jwt from 'jsonwebtoken'

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body)
    res.send(createResponse(result, 'User created successfully'))
})

export const login = asyncHandler(async (req: Request, res: Response) => {
    passport.authenticate(
        'login',
        (
            err: { status: any; message: any },
            user: Omit<IUser, 'password'>,
            info: { message: any }
        ) => {
            if (err)
                return res
                    .status(err.status || 500)
                    .json({ message: err.message })

            const tokens = createUserTokens(user)

            res.send(createResponse({ user, tokens }, info.message))
        }
    )(req, res)
})

export const getUserByEmail = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await userService.getUserByEmail(req.params.email)
        if (result) {
            const { password, ...user } = result
            res.send(createResponse(user, 'User fetched successfully'))
        }
    }
)

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getUserById(req.params.id)
    if (result) {
        const { password, ...user } = result
        res.send(createResponse(user, 'User fetched successfully'))
    }
})

export const getMe = asyncHandler(async (req: Request, res: Response) => {
    const token = req.headers.authorization?.replace('Bearer ', '')

    // @ts-ignore
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string
    }

    const result = await userService.getUserById(decodedUser.id)

    res.send(
        createResponse({
            id: result?.id,
            username: result?.username,
            email: result?.email,
            role: result?.role,
            createdAt: result?.createdAt,
        })
    )
})

export const bookTicket = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.bookTicket(req.body)
    res.send(createResponse(result, 'Ticket booked successfully'))
})

export const getEvents = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getEvents()
    res.send(createResponse(result, 'Events fetched successfully'))
})

export const getEventById = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await userService.getEventById(req.params.id)
        res.send(createResponse(result, 'Event fetched successfully'))
    }
)

export const getTicketsByEventId = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await userService.getTicketsByEventId(req.params.eventId)
        res.send(createResponse(result, 'Tickets fetched successfully'))
    }
)

export const getTicketsByUserId = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await userService.getTicketsByUserId(req.params.userId)
        res.send(createResponse(result, 'Tickets fetched successfully'))
    }
)

export const refreshToken = asyncHandler(
    async (req: Request, res: Response) => {
        const { refreshToken } = req.body

        if (!refreshToken) {
            throw createError(400, 'Refresh token is required')
        }

        try {
            const decoded = decodeToken(refreshToken) as unknown as {
                user: IUser
            }
            const newTokens = createUserTokens(decoded.user)
            res.send(createResponse(newTokens, 'Tokens refreshed successfully'))
        } catch (error) {
            throw createError(401, 'Invalid refresh token')
        }
    }
)
