"use client"

import { useState } from "react"
import { IndianRupee, Search, Sun, Moon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FARE_CHART } from "@/lib/types"

export function FareChart() {
  const [search, setSearch] = useState("")

  const filtered = FARE_CHART.filter((entry) =>
    entry.destination.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-foreground">
          <IndianRupee className="size-5 text-primary" />
          Official Fare Chart
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Rates from NITJ campus (Ref: NITJ/Reg/2265-2312, dated 19/2/2026)
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 text-sm"
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Sun className="size-3" /> Day: 5 AM - 9 PM
          </span>
          <span className="flex items-center gap-1">
            <Moon className="size-3" /> Night: 9 PM - 5 AM
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {filtered.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No destinations found.
            </p>
          )}
          {filtered.map((entry) => (
            <div
              key={entry.destination}
              className="rounded-lg border border-border/60 bg-card px-3 py-2.5"
            >
              <p className="text-sm font-medium text-foreground mb-2">
                {entry.destination}
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Sharing</span>
                  <Badge
                    variant="secondary"
                    className="font-mono text-xs tabular-nums"
                  >
                    {entry.sharing}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Sun className="size-3" /> Private
                  </span>
                  <Badge
                    variant="secondary"
                    className="font-mono text-xs tabular-nums"
                  >
                    {entry.privateDay}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Moon className="size-3" /> Private
                  </span>
                  <Badge
                    variant="secondary"
                    className="font-mono text-xs tabular-nums"
                  >
                    {entry.privateNight}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Moon className="size-3" /> To NITJ
                  </span>
                  <Badge
                    variant="secondary"
                    className="font-mono text-xs tabular-nums"
                  >
                    {entry.towardNITJNight}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
