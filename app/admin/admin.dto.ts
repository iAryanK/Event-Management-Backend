import { type BaseSchema } from '../common/dto/base.dto'

export interface IEvent extends BaseSchema {
    title: string
    description: string
    date: Date
    location: string
    ticketCount: number
    ticketPrice: number
    organizerId: number
}
