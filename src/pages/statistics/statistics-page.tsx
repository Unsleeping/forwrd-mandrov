import useAwesomeData from "@/hooks/useUsers";
import ChartTable from "@/pages/statistics/chart-table";
import { preparePieChartData } from "@/pages/statistics/utils";

const StatisticsPage = () => {
  const awesomeData = useAwesomeData();
  return (
    <section className="max-w-3xl mx-auto py-5">
      <ChartTable dataForChart={preparePieChartData(awesomeData)} />
    </section>
  );
};

export default StatisticsPage;
