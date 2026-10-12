"use client"

import { cn } from "cn"
import { Separator as Divider, type SeparatorProps } from "react-aria-components/Separator"

export function Separator({ orientation = "horizontal", className, ...props }: SeparatorProps) {
  return (
    <Divider
      orientation={orientation}
      className={cn(
        "shrink-0 border-0 bg-border forced-colors:bg-[ButtonBorder]",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  )
}
