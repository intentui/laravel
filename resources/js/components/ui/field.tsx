import {
  FieldError as FieldErrorPrimitive,
  type FieldErrorProps,
} from "react-aria-components/FieldError"
import { Label as LabelPrimitive, type LabelProps } from "react-aria-components/Label"
import { Text, type TextProps } from "react-aria-components/Text"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

import { cx } from "@/lib/primitive"

export const labelStyles = tv({
  base: [
    "text-base/6 text-foreground select-none in-data-required:not-data-[slot='control-label']:after:ml-1.5 sm:text-sm/6",
    "in-data-required:not-data-[slot='control-label']:after:text-danger-subtle-foreground in-data-required:not-data-[slot='control-label']:after:content-['*']",
    "group-disabled:opacity-50 in-disabled:pointer-events-none in-disabled:opacity-50",
  ],
})

export const descriptionStyles = tv({
  base: "block text-sm/6 text-muted-foreground group-disabled:opacity-50 in-disabled:opacity-50",
})

export const fieldErrorStyles = tv({
  base: "block text-sm/6 text-danger-subtle-foreground group-disabled:opacity-50 in-disabled:opacity-50 forced-colors:text-[Mark]",
})

export const fieldStyles = tv({
  base: [
    "w-full",
    "[&>[data-slot=control]+[data-slot=control]]:mt-2",
    "[&>[data-slot=label]+[data-slot=control]]:mt-2",
    "[&>[data-slot=label]+[slot='description']]:mt-1",
    "[&>[slot=description]+[data-slot=control]]:mt-2",
    "[&>[data-slot=control]+[slot=description]]:mt-2",
    "[&>[data-slot=control]+[slot=errorMessage]]:mt-2",
    "*:data-[slot=label]:font-medium",
    "disabled:opacity-50 in-disabled:opacity-50",
  ],
})

export function Label({ className, ...props }: LabelProps) {
  return <LabelPrimitive data-slot="label" {...props} className={labelStyles({ className })} />
}

export function Description({ className, ...props }: TextProps) {
  return <Text {...props} slot="description" className={descriptionStyles({ className })} />
}

export function Fieldset({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      className={twMerge("*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6", className)}
      {...props}
    />
  )
}

export function FieldGroup({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div data-slot="control" className={twMerge("space-y-6", className)} {...props} />
}

export function FieldError({ className, ...props }: FieldErrorProps) {
  return <FieldErrorPrimitive {...props} className={cx(fieldErrorStyles(), className)} />
}

export function Legend({ className, ...props }: React.ComponentProps<"legend">) {
  return (
    <legend
      data-slot="legend"
      {...props}
      className={twMerge("text-base/6 font-semibold data-disabled:opacity-50", className)}
    />
  )
}
