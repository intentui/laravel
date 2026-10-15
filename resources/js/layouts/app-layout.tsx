import type { PropsWithChildren } from "react"

import { Flash } from "@/components/flash"
import { Footer } from "@/components/footer"
import { AppNavbar } from "@/layouts/app-navbar"

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Flash />
      <AppNavbar />
      {children}
      <Footer />
    </div>
  )
}
