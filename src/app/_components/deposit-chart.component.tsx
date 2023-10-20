import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCompactUSDAmount } from '@/lib/amount';

const data = [
  {
    date: 'June 2023',
    TVL: 9345.34,
  },
  {
    date: 'July 2023',
    TVL: 12343.332,
  },
  {
    date: 'August 2023',
    TVL: 13232.67,
  },
  {
    date: 'September 2023',
    TVL: 17039.21,
  },
  {
    date: 'October 2023',
    TVL: 20034.34,
  },
];

export function DepositChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Total Value Locked
        </CardTitle>
        <div className="text-2xl font-bold">$20,034.34</div>
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
                              Date
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].payload.date}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Deposit
                            </span>
                            <span className="font-bold">
                              {formatCompactUSDAmount(payload[0].payload.TVL)}
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
                dataKey="TVL"
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
