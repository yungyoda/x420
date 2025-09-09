"use client";

import * as React from "react";
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import CountdownTimer from "@/components/CountdownTimer";
import type { Entry } from "@/lib/api";

interface EntryCardProps {
  entry: Entry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  const { show } = useToast();

  // Get current domain for ID prefixing
  const getDomainId = (id: string) => {
    if (typeof window === 'undefined') return id;
    return `${window.location.origin}/api/${id}`;
  };

  return (
    <Card 
      className="p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] group h-full flex flex-col"
      onClick={() => window.open(getDomainId(entry.id), '_blank')}
    >
      <CardHeader className="flex-1">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle>{entry.title}</CardTitle>
            <CardDescription>{entry.description}</CardDescription>
          </div>
          <div className="text-right ml-4">
            <div className="text-2xl font-bold text-white">${entry.amount}</div>
            <div className="text-sm text-white/60">per call</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Countdown timer with status indicator and external link */}
        <div className="flex justify-between items-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <CountdownTimer expiresAt={entry.expiresAt} />
        </div>
      </CardContent>
    </Card>
  );
}
