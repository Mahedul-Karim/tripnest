"use client";

import React from "react";
import SectionHeading from "../../common/SectionHeading";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  goodReview: {
    label: "Good Review",
    color: "var(--accent)",
  },
  badReview: {
    label: "Bad Review",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const ReviewsChart = ({
  chartData,
}: {
  chartData: {
    month: string;
    goodReview: number;
    badReview: number;
  }[];
}) => {
  return (
    <div>
      <SectionHeading>Reviews Statistics</SectionHeading>
      <div className="mt-6">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="badReview"
              type="natural"
              fill="var(--color-badReview)"
              fillOpacity={0.3}
              stroke="var(--color-badReview)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="goodReview"
              type="natural"
              fill="var(--color-goodReview)"
              fillOpacity={0.3}
              strokeWidth={2}
              stroke="var(--color-goodReview)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default ReviewsChart;
