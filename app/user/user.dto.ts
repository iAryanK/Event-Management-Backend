import { type BaseSchema } from '../common/dto/base.dto'

export interface IUser extends BaseSchema {
    username: string
    email: string
    password: string
    role: 'USER' | 'ADMIN'
}

export interface ITicket extends BaseSchema {
    eventId: number
    userId: number
}
