"use client";

import React from "react";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  chartData: {
    month: string;
    [key: string]: string | number;
  }[];
  dataKey1: string;
  datakey2: string;
  chartConfig: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

const VisitorsBar: React.FC<Props> = ({
  chartData,
  dataKey1,
  datakey2,
  chartConfig,
}) => {
  return (
    <div className="mt-6">
      <ChartContainer config={chartConfig} className="h-[250px] w-full" >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar
            dataKey={dataKey1}
            fill={`var(--color-${dataKey1})`}
            radius={4}
          />
          <Bar
            dataKey={datakey2}
            fill={`var(--color-${datakey2})`}
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default VisitorsBar;
