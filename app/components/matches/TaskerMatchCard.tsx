"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Briefcase, DollarSign, MapPin, Star } from "lucide-react";
import { useState } from "react";
import TrustWarningsModal from "../modal/TrustWarningsModal";
import RecommendationReasonsModal from "../modal/RecommendationReasonsModal";
import ServiceRequestFromModal from "../modal/ServiceRequestFromModal";
import { categoryFields } from "@/app/utils/constant";
import Link from "next/link";

type Result = {
  name: string;
  primarySkill: string;
  price: number;
  bio: string,
  location: string
  priceType: string;
  taskerId: string,
  rating: number;
  totalReviews: number;
  experienceYears: number;
  completionRate: number;
  matchConfidence: string;
  recommendationReasons: string[];
  similarityScore: number;
  trustWarnings: string[];
};

export default function TaskerMatchCard({ result }: { result: Result }) {
  console.log('result from tasker match card', result)
  const initials = result.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const [openWarnings, setOpenWarnings] = useState(false);
  const [openReasons, setOpenReasons] = useState(false);


  const isLowTrust =
    result.rating === 0 ||
    result.totalReviews === 0 ||
    result.completionRate === 0;

  const confidenceColor =
    result.matchConfidence === "High"
      ? "bg-green-100 text-green-700"
      : result.matchConfidence === "Medium"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";



  return (
    <>
      <Card className="bg-white rounded-xl shadow-xs h-fit py-2  transition-all duration-300 ">
        <CardContent className="p-5 space-y-4">

          {/* HEADER */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h3 className="font-semibold text-lg">{result.name}</h3>
              <p className="text-sm text-muted-foreground">
                {result.primarySkill}
              </p>
            </div>

            <Badge className={`${confidenceColor}`}>
              {result.matchConfidence}
            </Badge>
          </div>

          {/* STATS */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={16} /> {result.location}
            </div>
            <div className="flex items-center gap-2">

              <DollarSign size={16} />
              {result.price}ETB
              {/* &nbsp; */}
              <span className="font-bold text-primary">

                {result.priceType}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-300 gap-2" />
              {result.totalReviews > 0
                ? `${result.rating} (${result.totalReviews})`
                : "No reviews"}
            </div>
            <div className="flex gap-2 items-center">
              <Briefcase size={16} />
              {result.experienceYears} Yr&apos;s Experience

            </div>
            <div>

            </div>
          </div>
          <div className="line-clamp-3 text-sm">
            {result.bio}
          </div>

          {/* MATCH SCORE */}
          <div className="text-xs text-muted-foreground">
            Match Score: {(result.similarityScore * 100).toFixed(1)}%
          </div>
          <div className="flex gap-4 text-xs pt-2">
            {isLowTrust && (
              <button
                onClick={() => setOpenWarnings(true)}
                className="text-red-600 underline "
              >
                View warnings
              </button>
            )}

            {result.recommendationReasons.length > 0 && (
              <button
                onClick={() => setOpenReasons(true)}
                className="text-green-600 underline"
              >
                Why this match?
              </button>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex  float-end gap-2 pt-2">
            <ServiceRequestFromModal taskerId={result.taskerId} fields={categoryFields}>

              <Button className="flex-1" >
                Send Request
              </Button>
            </ServiceRequestFromModal>
            <Link href={`/en/tasker/${result.taskerId}`}>
              <Button variant="outline">View Profile</Button>
            </Link>
            {/* <Button variant="outline" className="flex-1">
            View Profile
          </Button> */}
          </div>

        </CardContent>
      </Card>
      <TrustWarningsModal
        open={openWarnings}
        onOpenChange={setOpenWarnings}
        warnings={result.trustWarnings}
      />

      <RecommendationReasonsModal
        open={openReasons}
        onOpenChange={setOpenReasons}
        reasons={result.recommendationReasons}
      />
    </>
  );
}