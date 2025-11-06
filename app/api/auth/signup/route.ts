import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { cosmic } from '@/lib/cosmic'
import { getUserByEmail } from '@/lib/cosmic'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create user in Cosmic
    const newUser = await cosmic.objects.insertOne({
      title: name,
      type: 'users',
      metadata: {
        name,
        email,
        password_hash: passwordHash,
        created_at: new Date().toISOString(),
        last_login: null,
      },
    })

    // Generate JWT token using jose
    const secret = new TextEncoder().encode(JWT_SECRET)
    const token = await new SignJWT({
      userId: newUser.object.id,
      email,
      name,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .setIssuedAt()
      .sign(secret)

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: newUser.object.id,
        name,
        email,
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    )
  }
}