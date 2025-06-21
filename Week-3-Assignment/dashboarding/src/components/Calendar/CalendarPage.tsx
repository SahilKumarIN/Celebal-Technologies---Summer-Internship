import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  type: 'meeting' | 'task' | 'reminder';
  color: string;
}

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const events: Event[] = [
    {
      id: 1,
      title: 'Team Meeting',
      date: new Date(2024, 0, 15),
      time: '10:00 AM',
      type: 'meeting',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Project Deadline',
      date: new Date(2024, 0, 20),
      time: '5:00 PM',
      type: 'task',
      color: 'bg-red-500'
    },
    {
      id: 3,
      title: 'Client Presentation',
      date: new Date(2024, 0, 25),
      time: '2:00 PM',
      type: 'meeting',
      color: 'bg-green-500'
    },
  ];

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
        <button
          onClick={() => setShowEventModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus size={16} />
          <span>Add Event</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        {/* Calendar Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={previousMonth}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date) => {
              const dayEvents = getEventsForDate(date);
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const isCurrentMonth = isSameMonth(date, currentDate);

              return (
                <div
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`
                    p-2 min-h-[80px] border border-gray-100 dark:border-gray-700 cursor-pointer
                    hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                    ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300' : ''}
                    ${!isCurrentMonth ? 'opacity-50' : ''}
                  `}
                >
                  <div className="text-sm text-gray-900 dark:text-white mb-1">
                    {format(date, 'd')}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded text-white ${event.color} truncate`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {format(event.date, 'MMM d, yyyy')} at {event.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};