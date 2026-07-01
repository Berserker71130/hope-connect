"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Modal, ModalBody } from "../ui/modal";
import { dummyTestimonials } from "@/lib/dummy-data";
import { Play, Star } from "lucide-react";

export default function DonorTestimonials() {
  // State controller tracking active video playback YRL for the custom modal
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // Filters out only 'Donor' roles to satisfy the specific task requirements
  const donorItems = dummyTestimonials
    .filter((t) => t.role === "Donor")
    .slice(0, 6);

  return (
    <section className="w-full py-16 bg-background-default">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Heading module */}
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center">
          <Badge variant="active" size="md" className="mb-4">
            Impact Stories
          </Badge>
          <h2 className="text-3xl font--heading font-bold tracking-tight text-text-primary sm:text-4xl">
            Voices Of Our Supporters
          </h2>
          <p className="mt-3 text-body text-text-muted max-w-2xl">
            Read authentic experience from the global community making
            sustainable resource deployment possible.
          </p>
        </div>

        {/* 3-6 Items Responsive Grid Container Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donorItems.map((testimonial) => {
            // Safely cast or fallback properties added
            const isVerified = testimonial.isVerified ?? false;
            const rating = testimonial.rating ?? 5;
            const donationType = testimonial.donationType ?? "One-time Donor";
            const dateStr = testimonial.date ?? "2026";
            const locationStr = testimonial.location ?? "Global Supporter";

            return (
              <Card
                key={testimonial.id}
                variant={testimonial.videoUrl ? "featured" : "default"}
                padding="md"
                isHoverable={true}
                className="flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Card header block: Profile Avatar, Details, Star Matrix */}
                  <CardHeader className="p-0 pb-4 flex flex-row items-start justify-between space-y-0">
                    <div className="flex items-center space-x-3">
                      {/* Avatar wrapper with absolute image mapping */}
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-text-light/10 shrink-0">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Name, Location & Verified Check Ribbon */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-body font-semibold text-text-primary text-body leading-tight">
                            {testimonial.author}
                          </span>
                        </div>
                        <span className="text-small text-text-muted">
                          {locationStr}
                        </span>
                      </div>
                    </div>

                    {/* Star Rating Layout Module */}
                    <div
                      className="flex items-center space-x-0.5"
                      aria-label={`Rated ${rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={`h-3.5 w-3.5 ${
                            starIndex < rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-text-light/20"
                          }`}
                        />
                      ))}
                    </div>
                  </CardHeader>

                  {/* Trust badges row */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="new" size="sm">
                      {donationType}
                    </Badge>
                    {isVerified && (
                      <Badge variant="verified" size="sm">
                        Verified Donor
                      </Badge>
                    )}
                  </div>

                  {/* Card content block: Quote Text */}
                  <CardContent className="p-0">
                    <p className="text-body text-text-primary italic leading-relaxed font-body">
                      '{testimonial.quote}'
                    </p>
                  </CardContent>
                </div>

                {/* Card footer block: Date display & interactive video trigger */}
                <CardFooter className="p-0 pt-4 flex items-center justify-between mt-6">
                  <span className="text-small text-text-muted font-body">
                    {dateStr}
                  </span>

                  {/* Inline Video Player Control Trigger Check */}
                  {testimonial.videoUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-trust hover:text-primary transition-colors gap-1.5 px-2"
                      leftIcon={<Play className="h-3.5 w-3.5 fill-current" />}
                      onClick={() =>
                        setActiveVideoUrl(testimonial.videoUrl || null)
                      }
                    >
                      Watch Story
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Unified Framed Modal Video Player Infrastructure */}
        <Modal
          isOpen={activeVideoUrl !== null}
          onClose={() => setActiveVideoUrl(null)}
          size="lg"
        >
          <ModalBody>
            {/* Correct Radix primitive registration with Tailwind's screen-reader layer */}
            <DialogPrimitive.Title className="sr-only">
              Donor Testimonial Video Player
            </DialogPrimitive.Title>

            <div className="relative aspect-video w-full bg-neutral-950 rounded-lg overflow-hidden mt-4">
              {activeVideoUrl && (
                <iframe
                  src={activeVideoUrl}
                  title="Donor Testimonial Video"
                  className="absolute inset-0 w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </ModalBody>
        </Modal>
      </div>
    </section>
  );
}
