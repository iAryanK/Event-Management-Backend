import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Clean database
    console.log('Cleaning database...')
    await prisma.ticket.deleteMany()
    await prisma.event.deleteMany()
    await prisma.user.deleteMany()
    console.log('Database cleaned successfully!')

    // Create users
    console.log('Creating users...')
    const users = []
    for (let i = 1; i <= 10; i++) {
        const user = await prisma.user.create({
            data: {
                username: `user${i}`,
                password: `password${i}`,
                email: `user${i}@example.com`,
                role: i === 1 ? 'ADMIN' : 'USER',
            },
        })
        users.push(user)
    }

    // Create events
    console.log('Creating events...')
    const events = []
    const eventTitles = [
        'Tech Conference 2024',
        'Music Festival',
        'Business Summit',
        'Art Exhibition',
        'Food Festival',
        'Sports Championship',
        'Film Premiere',
        'Book Fair',
        'Fashion Show',
        'Science Expo',
    ]

    const locations = [
        'New York',
        'London',
        'Tokyo',
        'Paris',
        'Sydney',
        'Berlin',
        'Dubai',
        'Singapore',
        'Toronto',
        'Mumbai',
    ]

    for (let i = 0; i < 10; i++) {
        const event = await prisma.event.create({
            data: {
                title: eventTitles[i],
                description: `This is a description for ${eventTitles[i]}. Join us for an amazing experience!`,
                date: new Date(2024, i, i + 1),
                location: locations[i],
                ticketCount: Math.floor(Math.random() * 100) + 50,
                ticketPrice: Math.floor(Math.random() * 100) + 20,
                organizerId: users[Math.floor(Math.random() * users.length)].id,
            },
        })
        events.push(event)
    }

    // Create tickets
    console.log('Creating tickets...')
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            await prisma.ticket.create({
                data: {
                    eventId: events[i].id,
                    userId: users[j].id,
                },
            })
        }
    }
    console.log('Database seeding completed successfully!')
}

main()
    .catch((e) => {
        throw new Error(`Seed failed: ${e.message}`)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
