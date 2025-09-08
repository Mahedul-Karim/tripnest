"use client";

import React from "react";
import SectionHeading from "../SectionHeading";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface Props {
  chartData: {
    month: string;
    [key: string]: string | number;
  }[];
  dataKey: string;
  title: string;
  chartConfig: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

const BookingChart: React.FC<Props> = ({
  chartData,
  dataKey,
  title,
  chartConfig,
}) => {
  return (
    <div>
      <SectionHeading>{title}</SectionHeading>
      <div className="mt-6">
        <ChartContainer config={chartConfig}>
          
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray={"3 3"} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // ticks={[0, 100, 200, 250, 300]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey={dataKey}
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--primary)"
              strokeWidth="1.5"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default BookingChart;
