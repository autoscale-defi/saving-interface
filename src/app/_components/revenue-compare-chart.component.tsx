import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const data = [
  {
    market: 4,
    apy: 6,
  },
  {
    market: 6,
    apy: 6,
  },
  {
    market: 8,
    apy: 6,
  },
  {
    market: 2,
    apy: 6,
  },
  {
    market: 4,
    apy: 6,
  },
];

export function RevenueCompareChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compare with market</CardTitle>
        <CardDescription>
          Compare our APY with the market average
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Market
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}%
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Our APY
                            </span>
                            <span className="font-bold">
                              {payload[1].value}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="market"
                activeDot={{
                  r: 6,
                  style: { fill: `hsl(var(--primary))`, opacity: 0.25 },
                }}
                style={
                  {
                    stroke: `hsl(var(--primary))`,
                    opacity: 0.25,
                  } as React.CSSProperties
                }
              />
              <Line
                type="monotone"
                dataKey="apy"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: `hsl(var(--primary))` },
                }}
                style={
                  {
                    stroke: `hsl(var(--primary))`,
                  } as React.CSSProperties
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
