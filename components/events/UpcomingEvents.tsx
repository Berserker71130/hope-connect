"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { dummyEvents, NGOEvent } from "@/lib/dummy-data";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";

export const UpcomingEvents = () => {
  return (
    <section
      className="relative w-full py-24 bg-background-default overflow-hidden border-t border-text-light/5"
      aria-labelledby="events-section-title"
    >
      {/* Editorial Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-100/10 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-8 bg-primary rounded-full" />
              <p className="text-xs font-sans tracking-[0.25em] text-primary uppercase font-bold">
                Get Involved On Site
              </p>
            </div>
            <h2
              id="events-section-title"
              className="text-3xl md:text-5xl font-sans font-black tracking-tight text-text-primary"
            >
              Upcoming Events
            </h2>
            <p className="mt-4 text-body text-text-muted max-w-xl leading-relaxed">
              Join our localized community operations, high-intent fundraising
              banquets, and strategic orientation programs mapped across global
              sectors.
            </p>
          </div>

          {/* Header action link (hidden on small mobile views, pinned to top layout) */}
          <div className="hidden sm:block">
            <Button
              variant="outline"
              size="md"
              rightIcon={<Calendar className="h-4 w-4" />}
              onClick={() => (window.location.href = "/calendar")}
            >
              View Full Calendar
            </Button>
          </div>
        </div>

        {/* Dynamic responsive grid layout (2-3 events) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {dummyEvents.slice(0, 3).map((event: NGOEvent) => {
            // Safe execution of date parsing via date-fns
            const parsedDate = parseISO(event.date);
            const displayMonth = format(parsedDate, "MMM");
            const displayDay = format(parsedDate, "dd");
            return (
              <Card
                key={event.id}
                variant="default"
                padding="none"
                accentBar="none"
                isHoverable={true}
                className="flex flex-col h-full group bg-background-default border border-text-light/10 shadow-sm"
              >
                {/* Image & floating glassmorphic date container */}
                <div className="relative w-full h-52 overflow-hidden bg-background-muted">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition- transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Glassmorphic shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Float date badge */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col items-center justify-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl min-w-[68px] border border-white/20">
                    <span className="text-[11px] font-sans font-black tracking-[0.15em] text-primary uppercase leading-none mb-1">
                      {displayMonth}
                    </span>
                    <span className="text-3xl font-sans font-black text-text-primary tracking-tighter leading-none">
                      {displayDay}
                    </span>
                  </div>

                  {/* Event type category badge float (top-right anchor) */}
                  <div className="absolute top-4 right-4 z-20">
                    <Badge category={event.category} size="sm">
                      {event.eventTypeLabel}
                    </Badge>
                  </div>
                </div>

                {/* Content block stack */}
                <div className="flex flex-col flex-1 p-6">
                  <CardHeader className="p-0 pb-3 space-y-0">
                    <h3 className="text-xl font-sans font-bold text-text-primary tracking-tight leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-1">
                      {event.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="p-0 flex-1 fle flex-col justify-between">
                    {/* Event description (truncated perfectly at 2 lines for compact metrics) */}
                    <p className="text-body text-text-muted text-sm leading-relaxed mb-6 line-clamp-2 font-normal">
                      {event.description}
                    </p>

                    {/* Meta metadata chips wrapper */}
                    <div className="space-y-2.5 pt-4 border-t border-text-light/5">
                      <div className="flex items-center text-text-muted text-xs gap-2.5 font-medium">
                        <Clock className="h-3.5 w-3.5 text-primary shrink-0 stroke-[2.5]" />
                        <span className="truncate">{event.time}</span>
                      </div>
                      <div className="flex items-center text-text-muted text-xs gap-2.5 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0 stroke-[2.5]" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </CardContent>

                  {/* Call to action interactions block */}
                  <div className="mt-6 pt-4 flex items-center justify-between gap-4">
                    <button
                      onClick={() =>
                        (window.location.href = `/events/${event.id}`)
                      }
                      className="text-xs font-sans tracking-wider uppercase font-bold text-text-muted hover:text-primary transition-colors duration-200 inline-flex items-center gap-1 group/btn cursor-pointer"
                    >
                      Learn More
                      <ArrowRight className="h-3 w-3 transform transition-transform duration-200 group-hover/btn: translate-x-1" />
                    </button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        (window.location.href = `/events/${event.id}/register`)
                      }
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Mobile view full calendar button alignment anchor */}
        <div className="mt-12 text-center sm:hidden">
          <Button
            variant="outline"
            size="md"
            className="w-full"
            rightIcon={<Calendar className="h-4 w-4" />}
            onClick={() => (window.location.href = "/calendar")}
          >
            View Full Calendar
          </Button>
        </div>
      </div>
    </section>
  );
};
