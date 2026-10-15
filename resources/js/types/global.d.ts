import type { VisitOptions } from "@inertiajs/core"

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: VisitOptions
  }
}
