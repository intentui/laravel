import type { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

import { Description } from "@/components/ui/field"

export function InputError({
  message,
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
  return message ? (
    <Description {...props} className={twMerge("block text-sm text-danger")}>
      {message}
    </Description>
  ) : null
}
