import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "@/components/ui/chart";
import { colorMap } from "@/_pages/statistics/utils";

export default function ChartTable({
  dataForChart,
}: {
  dataForChart: { country: string; users: number }[];
}) {
  return (
    <Card className="w-full max-w-4xl border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-center">
          User Distribution by Country
        </CardTitle>
        <CardDescription className="text-center">
          Breakdown of users across different countries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <ChartContainer
            config={{
              ...Object.fromEntries(
                dataForChart.map((item) => [
                  item.country,
                  {
                    label: item.country,
                    color: colorMap[item.country],
                  },
                ])
              ),
            }}
            className="h-[400px]"
          >
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataForChart}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="users"
                  >
                    {dataForChart.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colorMap[entry.country]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ payload }) => {
                      if (payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Country
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[0].payload.country}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Users
                                </span>
                                <span className="font-bold">
                                  {payload[0].value?.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <ChartLegend className="mt-4" />
            </>
          </ChartContainer>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right">Users</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataForChart.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: colorMap[item.country] }}
                        ></div>
                        {item.country}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {item.users.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
