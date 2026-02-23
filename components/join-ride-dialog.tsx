"use client"

import { useState } from "react"
import { useSWRConfig } from "swr"
import { User, Phone, Loader2 } from "lucide-react"
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

interface JoinRideDialogProps {
  rideId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function JoinRideDialog({
  rideId,
  open,
  onOpenChange,
}: JoinRideDialogProps) {
  const { mutate } = useSWRConfig()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!name || !phone) {
      setError("Please fill in all fields")
      return
    }

    if (!rideId) return

    setLoading(true)
    try {
      const res = await fetch(`/api/rides/${rideId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to join ride")
      }

      mutate("/api/rides")
      onOpenChange(false)
      setName("")
      setPhone("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-foreground">Join This Ride</DialogTitle>
          <DialogDescription>
            Enter your details so the driver and co-passengers can contact you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="join-name" className="flex items-center gap-1.5 text-foreground">
              <User className="size-3.5" />
              Your Name
            </Label>
            <Input
              id="join-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya S."
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="join-phone" className="flex items-center gap-1.5 text-foreground">
              <Phone className="size-3.5" />
              Phone Number
            </Label>
            <Input
              id="join-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91-98765-43210"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            {loading ? "Joining..." : "Join Ride"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
