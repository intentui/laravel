import { Head } from "@inertiajs/react"

import { CardHeader } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import AppLayout from "@/layouts/app-layout"

export default function Home() {
  return (
    <>
      <Head title="Inertia Laravel Starter kit" />
      <Container className="py-12">
        <CardHeader
          title="Laravel Starter Kit"
          description="A fully-featured Laravel starter kit built with Intent UI, offering a clean foundation for modern web apps."
        />
      </Container>
    </>
  )
}

Home.layout = (page: any) => <AppLayout children={page} />
