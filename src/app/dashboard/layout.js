export default function DashboardLayout({
    children,
  }) {
    return (
      <section>
        <nav>
        <h1>Menu</h1>
        </nav>
        {children}
      </section>
    )
  }