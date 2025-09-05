"use client";

import React from "react";
import { Pie, PieChart, Legend } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import SectionHeading from "../SectionHeading";

const chartData = [
  {
    tour: "tour1",
    booked: Math.round(Math.random() * 275),
    fill: "var(--color-tour1)",
  },
  {
    tour: "tour2",
    booked: Math.round(Math.random() * 275),
    fill: "var(--color-tour2)",
  },
  {
    tour: "tour3",
    booked: Math.round(Math.random() * 275),
    fill: "var(--color-tour3)",
  },
];
const chartConfig = {
  booked: {
    label: "Booked",
  },
  tour1: {
    label: "tour1",
    color: "var(--primary)",
  },
  tour2: {
    label: "tour2",
    color: "var(--chart-2)",
  },
  tour3: {
    label: "tour3",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const BookingPie = () => {
  return (
    <div>
      <SectionHeading>Top Bookings</SectionHeading>
      <div className="mt-6">
        <ChartContainer config={chartConfig} className="mx-auto min-h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Legend verticalAlign="top" />
            <Pie data={chartData} dataKey="booked" nameKey="tour" stroke="0" />
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default BookingPie;
