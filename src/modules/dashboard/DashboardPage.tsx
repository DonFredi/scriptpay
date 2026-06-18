import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import PageWrapper from "@/shared/components/shared/PageWrapper";
import DashboardCards from "./components/DashboardCards";

export default function Page() {
  return (
    <PageWrapper>
      <DashboardCards />
    </PageWrapper>
  );
}
