import { NextResponse } from 'next/server'

// Mock database or replace with real DB query
const mockUsers = [
    { email: 'admin@gmail.com', password: '0000', name: 'admin', id: 1, role: 1 },
    { email: 'instructor@gmail.com', password: '0000', name: 'instructor', id: 2, role: 2 },
    { email: 'user@gmail.com', password: '0000', name: 'user', id: 3, role: 3 },
]
export async function POST(request) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
        }

        const user = mockUsers.find(u => u.email === email && u.password === password)

        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
        }

        // Send back user details (omit sensitive info like password)
        return NextResponse.json(user);

    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}