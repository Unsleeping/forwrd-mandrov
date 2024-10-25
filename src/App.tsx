import { BrowserRouter, Routes, Route } from "react-router-dom";

import StatisticsPage from "@/_pages/statistics/statistics-page";
import UsersPage from "@/_pages/users/users-page";
import WelcomePage from "@/_pages/welcome/welcome-page";
import { AllContextsProviders } from "@/context/providers";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/header";

function App() {
  return (
    <BrowserRouter>
      <AllContextsProviders>
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
      </AllContextsProviders>
    </BrowserRouter>
  );
}

export default App;
