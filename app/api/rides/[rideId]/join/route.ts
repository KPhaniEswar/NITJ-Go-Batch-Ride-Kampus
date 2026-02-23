import { NextResponse } from "next/server"
import { joinRide } from "@/lib/rides-store"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ rideId: string }> }
) {
  try {
    const { rideId } = await params
    const body = await request.json()
    const { name, phone } = body

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 })
    }

    const ride = joinRide(rideId, { name, phone })

    if (!ride) {
      return NextResponse.json(
        { error: "Ride not found or already full" },
        { status: 400 }
      )
    }

    return NextResponse.json(ride)
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
