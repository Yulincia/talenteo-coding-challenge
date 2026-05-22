import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppLayout from "./layouts/app-layout";
import { DocumentsPage } from "@/pages/documents.page"
import { EmployeesPage } from "@/pages/employees.page";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />} >
            <Route index element={<DocumentsPage />} />
            <Route path="employees" element={<EmployeesPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
