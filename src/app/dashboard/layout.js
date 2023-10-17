import { DashboardMenu } from "@components/DashboardMenu"

export default function DashboardLayout({
    children,
  }) {
    return (
      <section>
        <nav>
          <DashboardMenu></DashboardMenu>
        </nav>
        {children}
      </section>
    )
  }