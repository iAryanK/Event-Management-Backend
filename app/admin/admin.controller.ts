import { type Request, type Response } from 'express'
import { createResponse } from '../common/helper/response.helper'
import asyncHandler from 'express-async-handler'
import * as adminService from './admin.service'

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
    const result = await adminService.createEvent(req.body)
    res.send(createResponse(result, 'Event created successfully'))
})

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
    const result = await adminService.updateEvent(req.params.id, req.body)
    res.send(createResponse(result, 'Event updated successfully'))
})

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
    const result = await adminService.deleteEvent(req.params.id)
    res.send(createResponse(result, 'Event deleted successfully'))
})

export const makeAdmin = asyncHandler(async (req: Request, res: Response) => {
    const result = await adminService.makeAdmin(req.params.id)
    res.send(createResponse(result, 'Admin made successfully'))
})
