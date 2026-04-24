"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Briefcase, DollarSign, Star } from "lucide-react";

type Result = {
  name: string;
  primarySkill: string;
  price: number;
  priceType: string;
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
    console.log('result from tasker match card',result)
  const initials = result.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

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
    <Card className="bg-white rounded-xl shadow-xs h-fit py-2  transition-all duration-300 border">
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
            <DollarSign size={16}/>
             {result.price} 
            &nbsp;
            <span className="font-bold text-primary">

            {result.priceType}
            </span>
            </div>
          <div className="flex items-center gap-2">
            <Star size={16} className="text-yellow-300 gap-2"/>
            {result.totalReviews > 0
              ? `${result.rating} (${result.totalReviews})`
              : "No reviews"}
          </div>
          <div className="flex gap-2 items-center">
            <Briefcase size={16}/>
             {result.experienceYears} Yr&apos;s Experience
              
          </div>
          <div>
           
          </div>
        </div>

        {/* MATCH SCORE */}
        <div className="text-xs text-muted-foreground">
          Match Score: {(result.similarityScore * 100).toFixed(1)}%
        </div>

        {/* WARNINGS */}
        {isLowTrust && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 space-y-1">
            <p className="text-sm font-medium text-red-600">
              ⚠️ Low Trust Profile
            </p>
            {result.trustWarnings.map((warn, i) => (
              <p key={i} className="text-xs text-red-500">
                • {warn}
              </p>
            ))}
          </div>
        )}

        {/* RECOMMENDATION REASONS */}
        {result.recommendationReasons.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3 space-y-1">
            <p className="text-xs font-medium text-green-700">
              Why this match?
            </p>
            {result.recommendationReasons.map((reason, i) => (
              <p key={i} className="text-xs text-green-600">
                ✔ {reason}
              </p>
            ))}
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex  float-end gap-2 pt-2">
          <Button className="flex-1">
            Send Request
          </Button>
          <Button variant="outline" className="flex-1">
            View Resume
          </Button>
        </div>

      </CardContent>
    </Card>
   
  );
}