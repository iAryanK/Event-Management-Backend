import { prisma } from '../common/services/database.service'
import bcrypt from 'bcryptjs'
import { ITicket, IUser } from './user.dto'

export const createUser = async (data: IUser) => {
    const saltRounds = 10
    const password = data.password
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    data.password = hashedPassword

    const result = prisma.user.create({
        data: {
            ...data,
            role: 'USER',
        },
    })
    return result
}

export const getUserById = async (id: string) => {
    const result = prisma.user.findUnique({
        where: {
            id: parseInt(id),
        },
    })
    return result
}

export const getUserByEmail = async (email: string) => {
    const result = prisma.user.findUnique({
        where: {
            email,
        },
    })

    return result
}

export const bookTicket = async (data: ITicket) => {
    const result = await prisma.$transaction(async (prisma) => {
        const event = await prisma.event.findUnique({
            where: {
                id: data.eventId,
            },
        })
        if (!event) {
            throw new Error('Event not found')
        }

        if (event.ticketCount <= 0) {
            throw new Error('Event is fully booked')
        }

        const ticket = await prisma.ticket.create({
            data,
        })

        // decrease the ticket count
        await prisma.event.update({
            where: {
                id: data.eventId,
            },
            data: {
                ticketCount: { decrement: 1 },
            },
        })

        return ticket
    })

    return result
}

export const getEvents = async () => {
    const result = prisma.event.findMany()
    return result
}

export const getEventById = async (id: string) => {
    const result = prisma.event.findUnique({
        where: {
            id: parseInt(id),
        },
    })
    return result
}

export const getTicketsByEventId = async (eventId: string) => {
    const result = prisma.ticket.findMany({
        where: {
            eventId: parseInt(eventId),
        },
    })
    return result
}

export const getTicketsByUserId = async (userId: string) => {
    const result = prisma.ticket.findMany({
        where: {
            userId: parseInt(userId),
        },
    })
    return result
}
