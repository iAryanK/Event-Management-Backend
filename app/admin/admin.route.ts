import { Router } from 'express'
import * as adminController from './admin.controller'
import * as adminValidator from './admin.validation'
import {
    authenticate,
    onlyAdmin,
} from '../common/middleware/authenticate.middleware'
import { catchError } from '../common/middleware/catch-error.middleware'

const router = Router()

router

    // user apis
    .put('/make-admin/:id', authenticate, onlyAdmin, adminController.makeAdmin)

    // event apis
    .post(
        '/event',
        authenticate,
        onlyAdmin,
        adminValidator.createEvent,
        catchError,
        adminController.createEvent
    )
    .patch(
        '/event/:id',
        authenticate,
        onlyAdmin,
        adminValidator.updateEvent,
        catchError,
        adminController.updateEvent
    )
    .delete('/event/:id', authenticate, adminController.deleteEvent)

export default router
