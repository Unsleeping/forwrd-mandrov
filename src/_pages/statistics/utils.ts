import { UserData } from "@/lib/types";
import countries from "@/data/countries.json";

export const preparePieChartData = (data: UserData) => {
  const countries = new Set(data.map((user) => user.country));

  const countriesWithUsers = Array.from(countries).map((country) => ({
    country,
    users: data.filter((user) => user.country === country).length,
  }));

  return countriesWithUsers.sort((a, b) => b.users - a.users);
};

//TODO: for more country generate more colors
function generateColors(): string[] {
  return [
    "#FF6B6B", // Bright Red
    "#4ECDC4", // Turquoise
    "#FFA500", // Orange
    "#45B7D1", // Sky Blue
    "#FF8C42", // Coral
    "#98D8C8", // Mint
    "#F64C72", // Pink
    "#C5E99B", // Light Green
  ];
}

export const colorMap = countries.reduce((acc, country, idx) => {
  acc[country] = generateColors()[idx];
  return acc;
}, {} as Record<string, string>);
