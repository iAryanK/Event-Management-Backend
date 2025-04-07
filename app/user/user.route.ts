import { Router } from 'express'
import { catchError } from '../common/middleware/catch-error.middleware'
import * as userController from './user.controller'
import * as userValidator from './user.validation'
import { authenticate } from '../common/middleware/authenticate.middleware'

const router = Router()

router

    // user apis
    .post(
        '/signup',
        userValidator.createUser,
        catchError,
        userController.createUser
    )
    .post('/login', userValidator.login, catchError, userController.login)
    .post('/refresh-token', userController.refreshToken)
    .get('/email/:email', authenticate, userController.getUserByEmail)
    .get('/id/:id', authenticate, userController.getUserById)
    .get('/me', authenticate, userController.getMe)

    // event apis
    .get('/events', userController.getEvents)
    .get('/event/:id', userController.getEventById)

    // ticket apis
    .post('/book-ticket', authenticate, userController.bookTicket)
    .get('/ticket/:eventId', authenticate, userController.getTicketsByEventId)
    .get('/ticket/:userId', authenticate, userController.getTicketsByUserId)

export default router
