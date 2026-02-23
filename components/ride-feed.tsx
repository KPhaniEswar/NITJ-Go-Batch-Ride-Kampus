"use client"

import useSWR from "swr"
import { RideCard } from "@/components/ride-card"
import type { Ride } from "@/lib/types"
import { MapPin } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface RideFeedProps {
  onJoin: (rideId: string) => void
}

export function RideFeed({ onJoin }: RideFeedProps) {
  const { data: rides, error, isLoading } = useSWR<Ride[]>("/api/rides", fetcher, {
    refreshInterval: 10000,
  })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-52 animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
        <p className="text-sm text-destructive">
          Failed to load rides. Please try again.
        </p>
      </div>
    )
  }

  if (!rides || rides.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <MapPin className="size-7 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold text-foreground">No rides available</p>
          <p className="text-sm text-muted-foreground">
            Be the first to create a ride for others to join!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium text-muted-foreground">
        {rides.length} {rides.length === 1 ? "ride" : "rides"} available
      </p>
      {rides.map((ride) => (
        <RideCard key={ride.id} ride={ride} onJoin={onJoin} />
      ))}
    </div>
  )
}
