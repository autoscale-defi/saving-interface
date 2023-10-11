'use client';

import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  {
    treasury: 10400,
  },
  {
    treasury: 14405,
  },
  {
    treasury: 9400,
  },
  {
    treasury: 8200,
  },
  {
    treasury: 7000,
  },
  {
    treasury: 9600,
  },
  {
    treasury: 11244,
  },
  {
    treasury: 26475,
  },
];

export function RevenueChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">Treasury</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$15,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        <div className="h-[80px]">
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
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="treasury"
                activeDot={{
                  r: 6,
                  style: { fill: `hsl(var(--primary))`, opacity: 0.25 },
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
