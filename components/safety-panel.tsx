"use client"

import { Shield, Phone, ExternalLink, Car, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SECURITY_CONTACTS, OFFICIAL_DRIVERS } from "@/lib/types"
import { FareChart } from "@/components/fare-chart"

export function SafetyPanel() {
  return (
    <div className="flex flex-col gap-4">
      {/* Campus Security */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-foreground">
            <Shield className="size-5 text-destructive" />
            Campus Security
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground mb-2">
            Quick-dial for emergencies or safety concerns on campus.
          </p>
          {SECURITY_CONTACTS.map((contact) => (
            <a
              key={contact.phone}
              href={`tel:${contact.phone}`}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-3 py-2.5 transition-colors hover:bg-secondary/50"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {contact.name}
                </p>
                <p className="text-xs text-muted-foreground">{contact.phone}</p>
              </div>
              <Phone className="size-4 text-destructive" />
            </a>
          ))}
        </CardContent>
      </Card>

      {/* Official Drivers */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-foreground">
            <Car className="size-5 text-primary" />
            Authorized Drivers
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Stand: Inside campus near Main Gate
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {OFFICIAL_DRIVERS.map((driver) => (
            <a
              key={driver.phone}
              href={`tel:${driver.phone}`}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-3 py-2.5 transition-colors hover:bg-secondary/50"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-foreground">
                  {driver.name}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-[10px] px-1.5 py-0">
                    {driver.vehicle}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {driver.phone}
                  </span>
                </div>
              </div>
              <Phone className="size-4 shrink-0 text-primary" />
            </a>
          ))}
        </CardContent>
      </Card>

      {/* Fare Chart */}
      <FareChart />

      {/* Download Official PDF */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-foreground">
            <FileText className="size-5 text-primary" />
            Official Office Order
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Download the official NITJ notice with authorized driver list and
            fare chart issued by the Registrar.
          </p>
          <Button
            variant="outline"
            className="w-full text-foreground"
            asChild
          >
            <a href="/drivers.pdf" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 size-4" />
              View Official Order (PDF)
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
