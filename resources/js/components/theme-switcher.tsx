import { ComputerDesktopIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { type Theme, useTheme } from "@/hooks/use-theme"

interface Themes {
  value: Theme
  icon: React.FC<React.SVGAttributes<SVGSVGElement>>
  label: string
}

export function ThemeSwitcher() {
  const { theme, updateTheme } = useTheme()
  const themes: Themes[] = [
    { value: "light", icon: SunIcon, label: "Light" },
    {
      value: "dark",
      icon: MoonIcon,
      label: "Dark",
    },
    {
      value: "system",
      icon: ComputerDesktopIcon,
      label: "System",
    },
  ]

  return (
    <ToggleGroup
      size="sm"
      selectedKeys={new Set([theme])}
      onSelectionChange={(v) => {
        // @ts-expect-error
        updateTheme([...v][0])
      }}
      selectionMode="single"
      aria-label="Choose theme"
    >
      {themes.map((theme) => (
        <ToggleGroupItem key={theme.value} id={theme.value} aria-label={theme.value}>
          <theme.icon />
          {theme.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
