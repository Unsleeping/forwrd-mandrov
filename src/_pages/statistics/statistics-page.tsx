import ChartTable from "@/components/statistics/chart-table";
import { preparePieChartData } from "@/_pages/statistics/utils";
import useUserData from "@/hooks/useUserData";

const StatisticsPage = () => {
  const usersData = useUserData();

  return (
    <section className="max-w-3xl mx-auto py-5">
      <ChartTable dataForChart={preparePieChartData(usersData)} />
    </section>
  );
};

export default StatisticsPage;
