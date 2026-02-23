import type { Ride, Passenger } from "./types"

// In-memory store for rides (no database integration)
let rides: Ride[] = [
  {
    id: "demo-1",
    creatorName: "Arjun M.",
    creatorPhone: "+91-98000-00001",
    origin: "Hostel Block A",
    destination: "Bus Stand Jalandhar",
    departureTime: getUpcomingTime(1),
    capacity: 3,
    passengers: [
      { id: "p1", name: "Arjun M.", phone: "+91-98000-00001" },
      { id: "p2", name: "Priya S.", phone: "+91-98000-00002" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-2",
    creatorName: "Neha R.",
    creatorPhone: "+91-98000-00003",
    origin: "NITJ Main Gate",
    destination: "City Railway Station",
    departureTime: getUpcomingTime(2),
    capacity: 4,
    passengers: [
      { id: "p3", name: "Neha R.", phone: "+91-98000-00003" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "demo-3",
    creatorName: "Vikram T.",
    creatorPhone: "+91-98000-00004",
    origin: "Library",
    destination: "Model Town",
    departureTime: getUpcomingTime(3),
    capacity: 3,
    passengers: [
      { id: "p4", name: "Vikram T.", phone: "+91-98000-00004" },
      { id: "p5", name: "Sanjay K.", phone: "+91-98000-00005" },
      { id: "p6", name: "Ritu P.", phone: "+91-98000-00006" },
    ],
    createdAt: new Date().toISOString(),
  },
]

function getUpcomingTime(hoursAhead: number): string {
  const d = new Date()
  d.setHours(d.getHours() + hoursAhead)
  d.setMinutes(0, 0, 0)
  return d.toISOString()
}

const EXPIRY_HOURS = 36

function filterExpired(rideList: Ride[]): Ride[] {
  const now = new Date()
  return rideList.filter((ride) => {
    const departure = new Date(ride.departureTime)
    const diff = (now.getTime() - departure.getTime()) / (1000 * 60 * 60)
    return diff < EXPIRY_HOURS
  })
}

export function getRides(): Ride[] {
  return filterExpired(rides).sort(
    (a, b) =>
      new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
  )
}

export function createRide(data: {
  creatorName: string
  creatorPhone: string
  origin: string
  destination: string
  departureTime: string
  capacity: number
}): Ride {
  const id = `ride-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  const passenger: Passenger = {
    id: `p-${Date.now()}`,
    name: data.creatorName,
    phone: data.creatorPhone,
  }
  const ride: Ride = {
    id,
    ...data,
    passengers: [passenger],
    createdAt: new Date().toISOString(),
  }
  rides = [ride, ...rides]
  return ride
}

export function joinRide(
  rideId: string,
  passengerData: { name: string; phone: string }
): Ride | null {
  const rideIndex = rides.findIndex((r) => r.id === rideId)
  if (rideIndex === -1) return null

  const ride = rides[rideIndex]
  if (ride.passengers.length >= ride.capacity) return null

  const passenger: Passenger = {
    id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
    ...passengerData,
  }

  const updatedRide = {
    ...ride,
    passengers: [...ride.passengers, passenger],
  }
  rides[rideIndex] = updatedRide
  return updatedRide
}
