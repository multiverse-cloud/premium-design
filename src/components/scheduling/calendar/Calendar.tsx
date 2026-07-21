"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  category?: string;
  location?: string;
  attendees?: { name: string; avatar?: string; status?: "accepted" | "pending" | "declined" }[];
  recurring?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    endDate?: Date;
  };
}

export interface CalendarProps {
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onEventCreate?: (event: Omit<CalendarEvent, "id">) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
  view?: "month" | "week" | "day" | "agenda";
  defaultDate?: Date;
  className?: string;
}

const eventColors = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#f97316", // orange
];

// Helper functions
const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  return { daysInMonth, startingDay, year, month };
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const isToday = (date: Date) => {
  return isSameDay(date, new Date());
};

// Mini Calendar (for date picker)
export interface MiniCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  className?: string;
}

export function MiniCalendar({ selectedDate, onDateSelect, className }: MiniCalendarProps) {
  const [viewDate, setViewDate] = React.useState(selectedDate);
  const { daysInMonth, startingDay, year, month } = getDaysInMonth(viewDate);

  const days = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Empty cells for days before the first day
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isSelected = isSameDay(date, selectedDate);
    const isCurrentDay = isToday(date);

    days.push(
      <button
        key={day}
        onClick={() => onDateSelect(date)}
        className={cn(
          "w-8 h-8 flex items-center justify-center text-sm rounded-lg transition-colors",
          isSelected && "bg-brand-500 text-white",
          !isSelected && isCurrentDay && "border-2 border-brand-500 text-brand-600 font-medium",
          !isSelected && !isCurrentDay && "hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        {day}
      </button>
    );
  }

  return (
    <div className={cn("p-3", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <span className="text-sm font-medium">
          {viewDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
        </span>
        <button
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((name) => (
          <div key={name} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {name}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
}

// Event Badge
function EventBadge({ event, compact = false }: { event: CalendarEvent; compact?: boolean }) {
  const color = event.color || eventColors[Math.abs(event.id.charCodeAt(0)) % eventColors.length];

  if (compact) {
    return (
      <div 
        className="text-xs px-1.5 py-0.5 rounded truncate"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {event.title}
      </div>
    );
  }

  return (
    <div 
      className="flex items-center gap-2 px-2 py-1 rounded text-xs"
      style={{ backgroundColor: `${color}20`, color }}
    >
      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
      <span className="truncate">{event.title}</span>
    </div>
  );
}

// Month View
function MonthView({
  events,
  currentDate,
  onDateClick,
  onEventClick,
}: {
  events: CalendarEvent[];
  currentDate: Date;
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}) {
  const { daysInMonth, startingDay, year, month } = getDaysInMonth(currentDate);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const days = [];
  
  // Empty cells for days before the first day
  for (let i = 0; i < startingDay; i++) {
    const prevMonthDays = new Date(year, month, 0).getDate();
    const day = prevMonthDays - startingDay + i + 1;
    days.push(
      <div key={`prev-${i}`} className="min-h-[100px] p-2 border-r border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 opacity-50">
        <span className="text-xs text-gray-500">{day}</span>
      </div>
    );
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayEvents = events.filter(e => isSameDay(e.start, date));
    const isCurrentDay = isToday(date);

    days.push(
      <div 
        key={day} 
        className="min-h-[100px] p-2 border-r border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
        onClick={() => onDateClick(date)}
      >
        <span className={cn(
          "inline-flex items-center justify-center w-7 h-7 text-sm rounded-full",
          isCurrentDay && "bg-brand-500 text-white font-medium"
        )}>
          {day}
        </span>
        <div className="mt-1 space-y-1">
          {dayEvents.slice(0, 3).map((event) => (
            <div key={event.id} onClick={(e) => { e.stopPropagation(); onEventClick(event); }}>
              <EventBadge event={event} compact />
            </div>
          ))}
          {dayEvents.length > 3 && (
            <span className="text-xs text-gray-500 pl-1">+{dayEvents.length - 3} more</span>
          )}
        </div>
      </div>
    );
  }

  // Empty cells for days after the last day
  const totalCells = startingDay + daysInMonth;
  const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 0; i < remainingCells; i++) {
    days.push(
      <div key={`next-${i}`} className="min-h-[100px] p-2 border-r border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 opacity-50">
        <span className="text-xs text-gray-500">{i + 1}</span>
      </div>
    );
  }

  return (
    <div>
      {/* Day names header */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
        {dayNames.map((name) => (
          <div key={name} className="p-3 text-center text-sm font-medium text-gray-600 dark:text-gray-400 border-r border-gray-100 dark:border-gray-800 last:border-r-0">
            {name}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {days}
      </div>
    </div>
  );
}

// Week View
function WeekView({
  events,
  currentDate,
  onEventClick,
}: {
  events: CalendarEvent[];
  currentDate: Date;
  onEventClick: (event: CalendarEvent) => void;
}) {
  const [weekStart, setWeekStart] = React.useState(() => {
    const d = new Date(currentDate);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    return d;
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const getEventsForHour = (date: Date, hour: number) => {
    return events.filter(e => {
      const eventHour = e.start.getHours();
      return isSameDay(e.start, date) && eventHour === hour;
    });
  };

  return (
    <div>
      {/* Week header */}
      <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
        <div className="p-3 border-r border-gray-100 dark:border-gray-800" />
        {weekDays.map((day, i) => (
          <div 
            key={i} 
            className={cn(
              "p-3 text-center border-r border-gray-100 dark:border-gray-800 last:border-r-0",
              isToday(day) && "bg-brand-50 dark:bg-brand-900/10"
            )}
          >
            <div className="text-xs text-gray-500">
              {day.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div className={cn(
              "text-lg font-medium",
              isToday(day) && "text-brand-600"
            )}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="grid grid-cols-8 max-h-[600px] overflow-y-auto">
        {/* Time column */}
        <div className="border-r border-gray-100 dark:border-gray-800">
          {hours.map((hour) => (
            <div key={hour} className="h-12 border-b border-gray-100 dark:border-gray-800 pr-2 text-right">
              <span className="text-xs text-gray-500">
                {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
              </span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="relative border-r border-gray-100 dark:border-gray-800 last:border-r-0">
            {hours.map((hour) => {
              const hourEvents = getEventsForHour(day, hour);
              return (
                <div 
                  key={hour} 
                  className="h-12 border-b border-gray-100 dark:border-gray-800 p-0.5"
                >
                  {hourEvents.map((event) => (
                    <div 
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className="text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ 
                        backgroundColor: `${event.color || eventColors[0]}20`,
                        color: event.color || eventColors[0]
                      }}
                    >
                      <span className="font-medium">{event.title}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// Day View
function DayView({
  events,
  currentDate,
  onEventClick,
}: {
  events: CalendarEvent[];
  currentDate: Date;
  onEventClick: (event: CalendarEvent) => void;
}) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dayEvents = events.filter(e => isSameDay(e.start, currentDate));

  const getEventsForHour = (hour: number) => {
    return dayEvents.filter(e => e.start.getHours() === hour);
  };

  return (
    <div>
      {/* Day header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <div className="text-sm text-gray-500">
          {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
        </div>
        <div className="text-2xl font-bold">
          {currentDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>
      </div>

      {/* Time grid */}
      <div className="max-h-[600px] overflow-y-auto">
        {hours.map((hour) => {
          const hourEvents = getEventsForHour(hour);
          return (
            <div key={hour} className="flex border-b border-gray-100 dark:border-gray-800">
              <div className="w-20 shrink-0 p-2 text-right">
                <span className="text-sm text-gray-500">
                  {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                </span>
              </div>
              <div className="flex-1 p-1 min-h-[60px]">
                {hourEvents.map((event) => (
                  <div 
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className="p-2 rounded-lg mb-1 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ 
                      backgroundColor: `${event.color || eventColors[0]}20`,
                      borderLeft: `3px solid ${event.color || eventColors[0]}`
                    }}
                  >
                    <div className="text-sm font-medium" style={{ color: event.color || eventColors[0] }}>
                      {event.title}
                    </div>
                    {event.description && (
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {event.description}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {event.location}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Agenda View
function AgendaView({
  events,
  onEventClick,
}: {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}) {
  // Group events by date
  const groupedEvents = events.reduce((acc, event) => {
    const dateKey = event.start.toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  const sortedDates = Object.keys(groupedEvents).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800">
      {sortedDates.map((dateKey) => {
        const date = new Date(dateKey);
        const dayEvents = groupedEvents[dateKey];
        
        return (
          <div key={dateKey} className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={cn(
                "w-12 h-12 rounded-lg flex flex-col items-center justify-center",
                isToday(date) ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-gray-800"
              )}>
                <span className="text-xs">{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
                <span className="text-lg font-bold">{date.getDate()}</span>
              </div>
              <div>
                <div className="font-medium">{formatDate(date)}</div>
                <div className="text-sm text-gray-500">{dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""}</div>
              </div>
            </div>
            
            <div className="ml-15 space-y-2">
              {dayEvents.map((event) => (
                <div 
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <div 
                    className="w-1 h-12 rounded-full shrink-0"
                    style={{ backgroundColor: event.color || eventColors[0] }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white">{event.title}</div>
                    <div className="text-sm text-gray-500">
                      {event.allDay ? "All day" : (
                        `${event.start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} - 
                        ${event.end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`
                      )}
                    </div>
                    {event.description && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Main Calendar Component
export function Calendar({
  events = [],
  onEventClick,
  view: initialView = "month",
  defaultDate = new Date(),
  className,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(defaultDate);
  const [view, setView] = React.useState<"month" | "week" | "day" | "agenda">(initialView);

  const goToToday = () => setCurrentDate(new Date());
  
  const goToPrev = () => {
    const newDate = new Date(currentDate);
    if (view === "month") newDate.setMonth(newDate.getMonth() - 1);
    else if (view === "week") newDate.setDate(newDate.getDate() - 7);
    else if (view === "day") newDate.setDate(newDate.getDate() - 1);
    else newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === "month") newDate.setMonth(newDate.getMonth() + 1);
    else if (view === "week") newDate.setDate(newDate.getDate() + 7);
    else if (view === "day") newDate.setDate(newDate.getDate() + 1);
    else newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const getTitle = () => {
    if (view === "month") return formatDate(currentDate);
    if (view === "week") {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
    }
    return currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <div className={cn("bg-white dark:bg-gray-900 rounded-xl shadow-premium border border-gray-200 dark:border-gray-700 overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Today
          </button>
        </div>

        <h2 className="text-xl font-bold">{getTitle()}</h2>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {(["month", "week", "day", "agenda"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-colors capitalize",
                  view === v && "bg-white dark:bg-gray-700 shadow-sm"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar content */}
      <div>
        {view === "month" && (
          <MonthView
            events={events}
            currentDate={currentDate}
            onDateClick={setCurrentDate}
            onEventClick={onEventClick || (() => {})}
          />
        )}
        {view === "week" && (
          <WeekView
            events={events}
            currentDate={currentDate}
            onEventClick={onEventClick || (() => {})}
          />
        )}
        {view === "day" && (
          <DayView
            events={events}
            currentDate={currentDate}
            onEventClick={onEventClick || (() => {})}
          />
        )}
        {view === "agenda" && (
          <AgendaView
            events={events}
            onEventClick={onEventClick || (() => {})}
          />
        )}
      </div>
    </div>
  );
}
