import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const StatsHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="text-center">
        User Distribution by Country
      </CardTitle>
      <CardDescription className="text-center">
        Breakdown of users across different countries
      </CardDescription>
    </CardHeader>
  );
};
