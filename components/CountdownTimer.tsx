"use client";

import * as React from "react";
import Badge from "@/components/ui/Badge";

interface CountdownTimerProps {
  expiresAt: string | null;
  className?: string;
  statusOverride?: 'healthy' | 'unhealthy' | 'unknown';
}

export default function CountdownTimer({ expiresAt, className = "", statusOverride }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = React.useState<string>("");

  React.useEffect(() => {
    if (!expiresAt) {
      setTimeLeft("Never expires");
      return;
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const difference = expiry - now;

      if (difference <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const totalHours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const hours = totalHours % 24;
      const days = Math.floor(totalHours / 24);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const getStatusColor = () => {
    if (statusOverride) {
      if (statusOverride === 'healthy') return "bg-green-400";
      if (statusOverride === 'unhealthy') return "bg-red-400";
      return "bg-gray-400";
    }
    if (!expiresAt) return "bg-green-400";
    if (timeLeft === "Expired") return "bg-red-400";
    if (timeLeft === "Never expires") return "bg-green-400";
    
    // Check if we're in the last hour (HH:MM:SS format)
    const timeParts = timeLeft.split(':');
    if (timeParts.length === 3) {
      const hours = parseInt(timeParts[0]);
      if (hours === 0) return "bg-yellow-400"; // Less than 1 hour remaining
    }
    
    return "bg-green-400";
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Badge variant="muted" className="text-xs">
        <span className="text-white/60">Expires:</span> {timeLeft}
      </Badge>
      <div className={`w-2 h-2 rounded-full animate-pulse ${getStatusColor()}`}></div>
    </div>
  );
}
