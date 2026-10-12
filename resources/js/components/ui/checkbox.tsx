import { CheckIcon, MinusIcon } from "@heroicons/react/20/solid"
import { Checkbox as CheckboxPrimitive, type CheckboxProps } from "react-aria-components/Checkbox"
import {
  CheckboxGroup as CheckboxGroupPrimitive,
  type CheckboxGroupProps,
} from "react-aria-components/CheckboxGroup"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { twMerge } from "tailwind-merge"
import { cx } from "@/lib/primitive"
import { Label } from "./field"

export function CheckboxGroup({ className, ...props }: CheckboxGroupProps) {
  return (
    <CheckboxGroupPrimitive
      {...props}
      data-slot="control"
      className={cx(
        "space-y-3 has-[[slot=description]]:space-y-6 has-[[slot=description]]:**:data-[slot=label]:font-medium **:[[slot=description]]:block",
        className,
      )}
    />
  )
}

export function Checkbox({ className, children, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive
      data-slot="control"
      className={cx(
        "group block [--indicator-mt:--spacing(0.75)] disabled:opacity-50 sm:[--indicator-mt:--spacing(1)]",
        className,
      )}
      {...props}
    >
      {composeRenderProps(
        children,
        (children, { isSelected, isIndeterminate, isFocusVisible, isInvalid }) => {
          const isStringChild = typeof children === "string"
          const indicator = isIndeterminate ? (
            <MinusIcon data-slot="check-indicator" />
          ) : isSelected ? (
            <CheckIcon data-slot="check-indicator" />
          ) : null

          const content = isStringChild ? <CheckboxLabel>{children}</CheckboxLabel> : children

          return (
            <div
              className={twMerge(
                "grid grid-cols-[1.125rem_1fr] gap-y-1 has-data-[slot=label]:gap-x-3 sm:grid-cols-[1rem_1fr]",
                "*:data-[slot=indicator]:col-start-1 *:data-[slot=indicator]:row-start-1 *:data-[slot=indicator]:mt-(--indicator-mt)",
                "*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1",
                "*:[[slot=description]]:col-start-2 *:[[slot=description]]:row-start-2",
                "has-[[slot=description]]:**:data-[slot=label]:font-medium",
              )}
            >
              <span
                data-slot="indicator"
                className={twMerge([
                  "relative inset-ring inset-ring-input isolate flex shrink-0 items-center justify-center rounded bg-(--control-bg,transparent) text-background transition group-hover:inset-ring-muted-foreground/30",
                  "sm:size-4 sm:*:data-[slot=check-indicator]:size-3.5",
                  "size-4.5 *:data-[slot=check-indicator]:size-4",
                  "in-disabled:bg-muted",
                  (isSelected || isIndeterminate) && [
                    "inset-ring-(--checkbox-ring,var(--color-ring)) bg-(--checkbox-bg,var(--color-primary)) text-(--checkbox-foreground,var(--color-primary-foreground))",
                    "group-invalid:inset-ring/70 group-invalid:bg-danger group-invalid:text-danger-foreground dark:group-invalid:inset-ring-danger-subtle-foreground/70",
                  ],
                  isFocusVisible && [
                    "inset-ring-(--checkbox-ring,var(--color-ring)) ring-(--checkbox-ring,var(--color-ring))/20 ring-3",
                    "group-invalid:inset-ring-danger-subtle-foreground/70 group-invalid:text-danger-foreground group-invalid:ring-danger-subtle-foreground/20",
                  ],
                  isInvalid &&
                    "inset-ring-danger-subtle-foreground/70 bg-danger-subtle/5 text-danger-foreground ring-danger-subtle-foreground/20 group-hover:inset-ring-danger-subtle-foreground/70",
                ])}
              >
                {indicator}
              </span>
              {content}
            </div>
          )
        },
      )}
    </CheckboxPrimitive>
  )
}

export function CheckboxLabel(props: React.ComponentProps<typeof Label>) {
  return <Label elementType="span" className="control-label" {...props} />
}
