import { BrowserRouter, Routes, Route } from "react-router-dom";

import StatisticsPage from "@/_pages/statistics/statistics-page";
import UsersPage from "@/_pages/users/users-page";
import WelcomePage from "@/_pages/welcome/welcome-page";
import { StoreProviders } from "@/context/providers";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/header";

function App() {
  return (
    <BrowserRouter>
      <StoreProviders>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header />
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Routes>
          </SidebarInset>
        </SidebarProvider>
      </StoreProviders>
    </BrowserRouter>
  );
}

export default App;
