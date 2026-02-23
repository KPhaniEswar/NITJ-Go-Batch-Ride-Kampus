"use client"

import { format } from "date-fns"
import {
  MapPin,
  Clock,
  Users,
  Phone,
  ArrowRight,
  UserPlus,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Ride } from "@/lib/types"

interface RideCardProps {
  ride: Ride
  onJoin: (rideId: string) => void
}

export function RideCard({ ride, onJoin }: RideCardProps) {
  const seatsLeft = ride.capacity - ride.passengers.length
  const fillPercent = (ride.passengers.length / ride.capacity) * 100
  const isFull = seatsLeft === 0
  const departureDate = new Date(ride.departureTime)
  const isToday =
    new Date().toDateString() === departureDate.toDateString()

  return (
    <Card className="overflow-hidden border-border/60 transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        {/* Top strip */}
        <div className="flex items-center justify-between bg-secondary/50 px-4 py-2.5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-3.5" />
            <span className="font-medium">
              {isToday ? "Today" : format(departureDate, "EEE, MMM d")}
              {" at "}
              {format(departureDate, "h:mm a")}
            </span>
          </div>
          {isFull ? (
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground"
            >
              Full
            </Badge>
          ) : (
            <Badge className="bg-success text-success-foreground">
              {seatsLeft} {seatsLeft === 1 ? "seat" : "seats"} left
            </Badge>
          )}
        </div>

        {/* Route */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="size-2.5 rounded-full bg-primary" />
              <div className="h-6 w-px bg-border" />
              <div className="size-2.5 rounded-full border-2 border-primary bg-primary-foreground" />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  From
                </p>
                <p className="font-semibold text-foreground">{ride.origin}</p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  To
                </p>
                <p className="font-semibold text-foreground">
                  {ride.destination}
                </p>
              </div>
            </div>
            <ArrowRight className="size-5 text-muted-foreground" />
          </div>
        </div>

        {/* Seat progress */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span className="flex items-center gap-1">
              <Users className="size-3" />
              {ride.passengers.length} / {ride.capacity} passengers
            </span>
          </div>
          <Progress
            value={fillPercent}
            className={`h-2 ${isFull ? "[&>[data-slot=progress-indicator]]:bg-muted-foreground" : "[&>[data-slot=progress-indicator]]:bg-primary"}`}
          />
        </div>

        {/* Creator + action */}
        <div className="flex items-center justify-between border-t border-border/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {ride.creatorName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {ride.creatorName}
              </p>
              <a
                href={`tel:${ride.creatorPhone}`}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="size-3" />
                {ride.creatorPhone}
              </a>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => onJoin(ride.id)}
            disabled={isFull}
            className={
              isFull
                ? ""
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }
          >
            <UserPlus className="size-4 mr-1" />
            {isFull ? "Full" : "Join"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
