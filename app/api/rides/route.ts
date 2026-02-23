import { NextResponse } from "next/server"
import { getRides, createRide } from "@/lib/rides-store"

export async function GET() {
  const rides = getRides()
  return NextResponse.json(rides)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { creatorName, creatorPhone, origin, destination, departureTime, capacity } = body

    if (!creatorName || !creatorPhone || !origin || !destination || !departureTime || !capacity) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (origin === destination) {
      return NextResponse.json({ error: "Origin and destination must be different" }, { status: 400 })
    }

    if (capacity < 2 || capacity > 6) {
      return NextResponse.json({ error: "Capacity must be between 2 and 6" }, { status: 400 })
    }

    const ride = createRide({ creatorName, creatorPhone, origin, destination, departureTime, capacity })
    return NextResponse.json(ride, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
