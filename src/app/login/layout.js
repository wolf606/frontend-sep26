import { SignInMenu } from "@components/SignInMenu";

export default function DashboardLayout({
  children,
}) {
  return (
    <section>
      <nav>
        <SignInMenu></SignInMenu>
      </nav>
      {children}
    </section>
  )
}