import { BrowserRouter, Routes, Route } from "react-router-dom";
import StatisticsPage from "@/pages/statistics/statistics-page";
import UsersPage from "@/pages/users/users-page";
import { Providers } from "@/context/context";
import { AppSidebar } from "@/components/app-sidebar";
import WelcomePage from "@/pages/welcome/welcome-page";
import { SidebarInset } from "./components/ui/sidebar";
import Header from "./components/header";

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </SidebarInset>
      </Providers>
    </BrowserRouter>
  );
}

export default App;
