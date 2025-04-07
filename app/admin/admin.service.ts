import { prisma } from '../common/services/database.service'
import { IEvent } from './admin.dto'

export const createEvent = async (data: IEvent) => {
    const result = prisma.event.create({
        data,
    })
    return result
}

export const updateEvent = async (id: string, data: IEvent) => {
    const result = prisma.event.update({
        where: { id: parseInt(id) },
        data,
    })
    return result
}

export const deleteEvent = async (id: string) => {
    const result = prisma.event.delete({
        where: { id: parseInt(id) },
    })
    return result
}

export const makeAdmin = async (id: string) => {
    const result = prisma.user.update({
        where: { id: parseInt(id) },
        data: { role: 'ADMIN' },
    })
    return result
}
