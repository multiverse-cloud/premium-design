"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/data-display/card/Card";
import { Calendar, CalendarEvent } from "@/components/scheduling/calendar/Calendar";
import { Button } from "@/components/ui/button/Button";
import { ToastProvider, useToastHelpers } from "@/components/overlay/toast/Toast";

// Generate sample events
const generateEvents = (): CalendarEvent[] => {
  const today = new Date();
  const events: CalendarEvent[] = [];

  // Team Meeting
  events.push({
    id: "1",
    title: "Team Meeting",
    description: "Weekly sync with the engineering team",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 11, 0),
    color: "#3b82f6",
    location: "Conference Room A",
    attendees: [
      { name: "Sarah Chen", status: "accepted" },
      { name: "Mike Johnson", status: "accepted" },
      { name: "Alex Kim", status: "pending" },
    ],
  });

  // Product Review
  events.push({
    id: "2",
    title: "Product Review",
    description: "Q1 product roadmap review",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 14, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 15, 30),
    color: "#10b981",
    location: "Zoom",
  });

  // Design Sprint
  events.push({
    id: "3",
    title: "Design Sprint",
    description: "UI/UX design sprint session",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 9, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 17, 0),
    allDay: true,
    color: "#8b5cf6",
    category: "Design",
  });

  // Client Call
  events.push({
    id: "4",
    title: "Client Call",
    description: "Quarterly business review with Acme Corp",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4, 11, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4, 12, 0),
    color: "#f59e0b",
    location: "Phone",
  });

  // Code Review
  events.push({
    id: "5",
    title: "Code Review",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0),
    color: "#ef4444",
  });

  // Lunch with Team
  events.push({
    id: "6",
    title: "Team Lunch",
    description: "Monthly team lunch at Italian Bistro",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 12, 30),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 14, 0),
    color: "#06b6d4",
    location: "Italian Bistro, 123 Main St",
  });

  // Workshop
  events.push({
    id: "7",
    title: "React Workshop",
    description: "Advanced React patterns training",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 9, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 16, 0),
    allDay: true,
    color: "#ec4899",
    category: "Training",
  });

  // 1:1 Meeting
  events.push({
    id: "8",
    title: "1:1 with Manager",
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8, 10, 30),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8, 11, 0),
    color: "#f97316",
  });

  return events;
};

function CalendarDemo() {
  const toast = useToastHelpers();
  const [events] = useState(generateEvents());

  const handleEventClick = (event: CalendarEvent) => {
    const dateStr = event.start.toLocaleDateString("en-US", { 
      weekday: "short", 
      month: "short", 
      day: "numeric" 
    });
    const timeStr = event.allDay 
      ? "All day" 
      : `${event.start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} - ${event.end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
    
    toast.info(
      event.title,
      `${dateStr} • ${timeStr}${event.location ? ` • ${event.location}` : ""}`
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calendar</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Multiple calendar views with events, scheduling, and more
        </p>
      </div>

      {/* Main Calendar */}
      <Calendar
        events={events}
        onEventClick={handleEventClick}
        view="month"
      />

      {/* Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Views</h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500" />
                Month view - Traditional calendar grid
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500" />
                Week view - Hourly schedule across days
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500" />
                Day view - Detailed daily schedule
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500" />
                Agenda view - Event list grouped by date
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Features</h3>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success-500" />
                Event colors
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success-500" />
                Location
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success-500" />
                Attendees
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success-500" />
                All-day events
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success-500" />
                Navigation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success-500" />
                Today button
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success-500" />
                Dark mode
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success-500" />
                Event overflow
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Sample Events */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Upcoming Events</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.slice(0, 5).map((event) => (
              <div 
                key={event.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div 
                  className="w-1 h-12 rounded-full"
                  style={{ backgroundColor: event.color }}
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">{event.title}</div>
                  <div className="text-sm text-gray-500">
                    {event.start.toLocaleDateString("en-US", { 
                      weekday: "short", 
                      month: "short", 
                      day: "numeric" 
                    })}
                    {" • "}
                    {event.allDay 
                      ? "All day" 
                      : event.start.toLocaleTimeString("en-US", { 
                          hour: "numeric", 
                          minute: "2-digit" 
                        })}
                  </div>
                </div>
                {event.location && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {event.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <ToastProvider position="top-right">
      <CalendarDemo />
    </ToastProvider>
  );
}
