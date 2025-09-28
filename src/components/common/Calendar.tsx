"use client";

import React, { memo, useMemo, useState } from "react";
import { ChevronRight,ChevronLeft } from 'lucide-react'

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Props {
  startDate: number;
  setStartDate: (val: number) => void;
}

const Calendar: React.FC<Props> = ({ startDate, setStartDate }) => {
  const currentDate = new Date();

  const selectedDate = new Date(startDate);

  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());

  const dates = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDay();
    const lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    const lastDateOfCurrentMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

    const dateData: { date: number; isActive: boolean; fullDate: Date }[] = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      const day = lastDateOfLastMonth - i + 1;
      dateData.push({
        date: day,
        isActive: false,
        fullDate: new Date(currentYear, currentMonth - 1, day),
      });
    }

    for (let i = 1; i <= lastDateOfCurrentMonth; i++) {
      dateData.push({
        date: i,
        isActive: true,
        fullDate: new Date(currentYear, currentMonth, i),
      });
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
      const day = i - lastDayOfMonth + 1;
      dateData.push({
        date: day,
        isActive: false,
        fullDate: new Date(currentYear, currentMonth + 1, day),
      });
    }

    return dateData;
  }, [currentYear, currentMonth]);

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-4">
        <button
          className="text-navy  disabled:text-gray-400 bg-primary-foreground size-6 xs:size-8 grid place-items-center rounded-full hover:bg-primary disabled:hover:bg-primary-foreground hover:text-white transition-all duration-300 cursor-pointer disabled:cursor-auto"
          onClick={prevMonth}
          disabled={currentDate.getMonth() === currentMonth}
        >
          <ChevronLeft className="text-xs xs:text-sm" />
        </button>
        <p className="text-navy text-sm xs:text-base font-medium">
          {MONTHS.at(currentMonth)}, {currentYear}
        </p>
        <button
          className="text-navy  disabled:text-gray-400 bg-primary-foreground size-6 xs:size-8 grid place-items-center rounded-full hover:bg-primary disabled:hover:bg-primary-foreground hover:text-white transition-all duration-300 cursor-pointer disabled:cursor-auto"
          onClick={nextMonth}
        >
          <ChevronRight className="text-xs xs:text-sm" />
        </button>
      </div>
      <div className="grid grid-cols-7 mt-5">
        {DAYS.map((day, i) => (
          <div key={i} className="font-normal text-xs xs:text-sm">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 mt-4">
        {dates.map((date, i) => {
          const isDisabled =
            !date.isActive ||
            (currentDate.getMonth() === currentMonth &&
              date.date < currentDate.getDate());

          return (
            <div key={i}>
              <button
                type="button"
                className={`mb-4 disabled:text-gray-400 disabled:hover:bg-transparent cursor-pointer disabled:cursor-auto hover:bg-primary hover:text-white hover:transition-all hover:duration-300 w-8 h-8 rounded-full text-xs xs:text-sm ${
                  date.date === +selectedDate.getDate() &&
                  !isDisabled &&
                  selectedDate.getMonth() === currentMonth &&
                  "bg-primary text-white"
                }`}
                disabled={isDisabled}
                onClick={() => {
                  const selectDate = +new Date(
                    currentYear,
                    currentMonth,
                    date.date
                  );

                  setStartDate(selectDate);
                }}
              >
                {date.date}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Calendar);
