import {
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
} from "react-aria-components/Link"
import { cx } from "@/lib/primitive"

export interface LinkProps
  extends LinkPrimitiveProps,
    Omit<InertiaLinkProps, keyof LinkPrimitiveProps> {
  ref?: React.RefObject<HTMLAnchorElement>
}

export function Link({ className, ref, ...props }: LinkProps) {
  return (
    <LinkPrimitive
      ref={ref}
      className={cx(
        "font-medium text-(--text)",
        "outline-0 outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring forced-colors:outline-[Highlight]",
        "disabled:cursor-default disabled:opacity-50 forced-colors:disabled:text-[GrayText]",
        "href" in props && "cursor-pointer",
        className,
      )}
      render={(domProps) =>
        "href" in domProps ? (
          <InertiaLink {...(props as InertiaLinkProps)} {...(domProps as InertiaLinkProps)} />
        ) : (
          <span {...domProps} />
        )
      }
      {...(props as LinkPrimitiveProps)}
    />
  )
}

import { Link as InertiaLink, type InertiaLinkProps } from "@inertiajs/react"
