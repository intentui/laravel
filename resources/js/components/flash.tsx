import { usePage } from "@inertiajs/react"
import { useEffect } from "react"
import { toast } from "sonner"

import { Toast } from "@/components/ui/toast"
import type { SharedData } from "@/types/shared"

export function Flash() {
  const { flash } = usePage<SharedData>().props
  useEffect(() => {
    if (flash?.message) {
      ;(toast as any)[flash.type](flash.message)
    }
  }, [flash])
  return <Toast />
}
