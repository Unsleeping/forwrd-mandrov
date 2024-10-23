import { BrowserRouter, Routes, Route } from "react-router-dom";
import StatisticsPage from "@/pages/statistics/statistics-page";
import UsersPage from "@/pages/users/users-page";
import { Providers } from "@/context/context";

function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Providers>
        <Routes>
          <Route path="/" element={<StatisticsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}

export default App;
