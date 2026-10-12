import { twMerge } from "tailwind-merge"
import { Container } from "@/components/ui/container"

interface HeaderProps extends React.ComponentProps<"div"> {
  title?: string
  ref?: React.Ref<HTMLDivElement>
}

export function Header({ title, className, ref, ...props }: HeaderProps) {
  return (
    <div
      ref={ref}
      className={twMerge("mb-12 border-b bg-background py-6 sm:py-12", className)}
      {...props}
    >
      <Container>
        <h1 className="font-semibold text-xl tracking-tight sm:text-2xl">{title}</h1>
      </Container>
    </div>
  )
}
