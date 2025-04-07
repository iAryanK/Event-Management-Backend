import { body, checkExact, param } from 'express-validator'

export const createEvent = checkExact([
    body('title').notEmpty().isString(),
    body('description').notEmpty().isString(),
    body('date').notEmpty().isDate(),
    body('location').notEmpty().isString(),
    body('ticketCount').notEmpty().isInt(),
    body('ticketPrice').notEmpty().isFloat(),
    body('organizerId').notEmpty().isInt(),
])

export const updateEvent = checkExact([
    param('id').notEmpty().isInt(),
    body('title').isString().optional(),
    body('description').isString().optional(),
    body('date').isDate().optional(),
    body('location').isString().optional(),
    body('ticketCount').isInt().optional(),
    body('ticketPrice').isFloat().optional(),
])
