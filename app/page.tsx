"use client"

import { useState } from "react"
import { Plus, Car, Shield, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RideFeed } from "@/components/ride-feed"
import { CreateRideDialog } from "@/components/create-ride-dialog"
import { JoinRideDialog } from "@/components/join-ride-dialog"
import { SafetyPanel } from "@/components/safety-panel"

export default function Home() {
  const [createOpen, setCreateOpen] = useState(false)
  const [joinOpen, setJoinOpen] = useState(false)
  const [joinRideId, setJoinRideId] = useState<string | null>(null)

  function handleJoin(rideId: string) {
    setJoinRideId(rideId)
    setJoinOpen(true)
  }

  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
              <Car className="size-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight text-foreground sm:text-lg">
                NITJ Go Batch Rides Kampus
              </h1>
              <p className="text-[11px] text-muted-foreground">
                Share autos with your batchmates
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => setCreateOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="mr-1 size-4" />
            New Ride
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-lg px-4 py-4">
        <Tabs defaultValue="rides" className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="rides" className="flex-1">
              <MapPin className="mr-1.5 size-4" />
              Rides
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex-1">
              <Shield className="mr-1.5 size-4" />
              Safety
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rides">
            <RideFeed onJoin={handleJoin} />
          </TabsContent>

          <TabsContent value="safety">
            <SafetyPanel />
          </TabsContent>
        </Tabs>
      </main>

      {/* Floating create button for mobile */}
      <div className="fixed right-4 bottom-6 z-50 md:hidden">
        <Button
          size="lg"
          onClick={() => setCreateOpen(true)}
          className="size-14 rounded-full bg-primary p-0 text-primary-foreground shadow-lg hover:bg-primary/90"
          aria-label="Create a new ride"
        >
          <Plus className="size-6" />
        </Button>
      </div>

      {/* Dialogs */}
      <CreateRideDialog open={createOpen} onOpenChange={setCreateOpen} />
      <JoinRideDialog
        rideId={joinRideId}
        open={joinOpen}
        onOpenChange={setJoinOpen}
      />
    </div>
  )
}
