import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const variants = {
      default: "bg-stone-900 text-stone-50 hover:bg-stone-800",
      outline: "border border-stone-200 bg-transparent hover:bg-stone-100 text-stone-900",
      ghost: "hover:bg-stone-100 text-stone-600 hover:text-stone-900",
      secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200",
    }
    
    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-12 px-8 text-base",
      icon: "h-9 w-9",
    }

    return (
      <Comp
        className={cn(
          "shadcn-btn",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
