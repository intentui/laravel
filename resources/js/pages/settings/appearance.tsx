import { Head } from "@inertiajs/react"

import { ThemeSwitcher } from "@/components/theme-switcher"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AppLayout from "@/layouts/app-layout"
import SettingsLayout from "@/pages/settings/settings-layout"

const title = "Appearance"

export default function Appearance() {
  return (
    <>
      <Head title={title} />
      <h1 className="sr-only">{title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>

          <CardDescription className="max-w-lg">
            Choose the most comfortable theme to make your experience using this app more enjoyable.
          </CardDescription>
        </CardHeader>

        <CardContent className="max-w-lg">
          <ThemeSwitcher />
        </CardContent>
      </Card>
    </>
  )
}

Appearance.layout = [AppLayout, SettingsLayout]
