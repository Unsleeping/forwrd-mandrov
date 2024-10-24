import * as React from "react";

import useAwesomeData from "@/hooks/useUsers";
import { AwesomeData } from "@/lib/types";
import ChartTable from "./chart-table";

type StatisticsPageProps = unknown;

const preparePieChartData = (data: AwesomeData) => {
  const originalData = data.originalData;
  const countries = new Set(originalData.map((user) => user.country));
  const countriesWithUsers = Array.from(countries).map((country) => ({
    country,
    users: originalData.filter((user) => user.country === country).length,
  }));

  return countriesWithUsers.sort((a, b) => b.users - a.users);
};

const StatisticsPage: React.FC<StatisticsPageProps> = () => {
  const awesomeData = useAwesomeData();
  return (
    <section className="max-w-3xl mx-auto py-5">
      <ChartTable dataForChart={preparePieChartData(awesomeData)} />
    </section>
  );
};

export default StatisticsPage;
