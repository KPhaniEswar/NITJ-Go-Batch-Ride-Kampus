"use client"

import { useState } from "react"
import { useSWRConfig } from "swr"
import { format } from "date-fns"
import {
  MapPin,
  User,
  Phone,
  Clock,
  Users,
  Loader2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CAMPUS_LOCATIONS } from "@/lib/types"

interface CreateRideDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateRideDialog({ open, onOpenChange }: CreateRideDialogProps) {
  const { mutate } = useSWRConfig()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departureTime, setDepartureTime] = useState("")
  const [capacity, setCapacity] = useState("3")

  function getMinDateTime() {
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    return now.toISOString().slice(0, 16)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!name || !phone || !origin || !destination || !departureTime) {
      setError("Please fill in all fields")
      return
    }

    if (origin === destination) {
      setError("Origin and destination must be different")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/rides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorName: name,
          creatorPhone: phone,
          origin,
          destination,
          departureTime: new Date(departureTime).toISOString(),
          capacity: parseInt(capacity),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to create ride")
      }

      mutate("/api/rides")
      onOpenChange(false)
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setName("")
    setPhone("")
    setOrigin("")
    setDestination("")
    setDepartureTime("")
    setCapacity("3")
    setError("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Create a Ride</DialogTitle>
          <DialogDescription>
            Share your auto ride with fellow students. You will be added as the
            first passenger.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="flex items-center gap-1.5 text-foreground">
              <User className="size-3.5" />
              Your Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Arjun M."
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="flex items-center gap-1.5 text-foreground">
              <Phone className="size-3.5" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91-98765-43210"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="origin" className="flex items-center gap-1.5 text-foreground">
              <MapPin className="size-3.5" />
              Pickup Point
            </Label>
            <Select value={origin} onValueChange={setOrigin}>
              <SelectTrigger id="origin">
                <SelectValue placeholder="Select pickup location" />
              </SelectTrigger>
              <SelectContent>
                {CAMPUS_LOCATIONS.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="destination" className="flex items-center gap-1.5 text-foreground">
              <MapPin className="size-3.5" />
              Drop-off Point
            </Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger id="destination">
                <SelectValue placeholder="Select drop-off location" />
              </SelectTrigger>
              <SelectContent>
                {CAMPUS_LOCATIONS.filter((loc) => loc !== origin).map(
                  (loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="departure" className="flex items-center gap-1.5 text-foreground">
              <Clock className="size-3.5" />
              Departure Time
            </Label>
            <Input
              id="departure"
              type="datetime-local"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              min={getMinDateTime()}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="capacity" className="flex items-center gap-1.5 text-foreground">
              <Users className="size-3.5" />
              Total Seats (including you)
            </Label>
            <Select value={capacity} onValueChange={setCapacity}>
              <SelectTrigger id="capacity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5, 6].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} passengers
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            {loading ? "Creating..." : "Create Ride"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
