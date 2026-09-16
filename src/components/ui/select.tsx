"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, Check } from "lucide-react"
import { cn } from "@/lib/utils"

// ── Context ──────────────────────────────────────────────────────────────────
interface SelectContextValue {
  value: string
  onValueChange: (v: string) => void
  open: boolean
  setOpen: (o: boolean) => void
}
const SelectContext = React.createContext<SelectContextValue>({
  value: "",
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
})

// ── Select root ───────────────────────────────────────────────────────────────
interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children?: React.ReactNode
}

function Select({ value, defaultValue = "", onValueChange, children }: SelectProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const [open, setOpen] = React.useState(false)
  const controlled = value !== undefined
  const current = controlled ? value! : internal

  const handleChange = (v: string) => {
    if (!controlled) setInternal(v)
    onValueChange?.(v)
    setOpen(false)
  }

  return (
    <SelectContext.Provider value={{ value: current, onValueChange: handleChange, open, setOpen }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

// ── Trigger ───────────────────────────────────────────────────────────────────
const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { open, setOpen } = React.useContext(SelectContext)
  return (
    <button
      ref={ref}
      type="button"
      role="combobox"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

// ── Value ─────────────────────────────────────────────────────────────────────
interface SelectValueProps {
  placeholder?: string
}
function SelectValue({ placeholder }: SelectValueProps) {
  const { value } = React.useContext(SelectContext)
  // Find the label of the selected item from the content
  // We'll use a data attribute approach — items register themselves
  const [label, setLabel] = React.useState<string | null>(null)

  // Re-render trick: we use a ref + event
  React.useEffect(() => {
    // label will be set by SelectItem registration
    setLabel(null)
  }, [value])

  return (
    <span className={cn(!value && "text-muted-foreground")}>
      {label ?? (value || (placeholder ?? ""))}
    </span>
  )
}

// ── Content ───────────────────────────────────────────────────────────────────
const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { position?: string }
>(({ className, children, ...props }, ref) => {
  const { open, setOpen } = React.useContext(SelectContext)
  const contentRef = React.useRef<HTMLDivElement>(null)

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.closest("[data-select-root]")?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open, setOpen])

  if (!open) return null

  return (
    <div
      ref={ref}
      data-select-content
      className={cn(
        "absolute z-50 min-w-[8rem] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 top-full mt-1",
        className
      )}
      {...props}
    >
      <div className="max-h-60 overflow-y-auto p-1">
        {children}
      </div>
    </div>
  )
})
SelectContent.displayName = "SelectContent"

// ── Group ─────────────────────────────────────────────────────────────────────
const SelectGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <div ref={ref} role="group" {...props} />
)
SelectGroup.displayName = "SelectGroup"

// ── Label ─────────────────────────────────────────────────────────────────────
const SelectLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
  )
)
SelectLabel.displayName = "SelectLabel"

// ── Item ──────────────────────────────────────────────────────────────────────
interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
}
const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, disabled, ...props }, ref) => {
    const ctx = React.useContext(SelectContext)
    const isSelected = ctx.value === value

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        onClick={() => { if (!disabled) ctx.onValueChange(value) }}
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && <Check className="h-4 w-4" />}
        </span>
        {children}
      </div>
    )
  }
)
SelectItem.displayName = "SelectItem"

// ── Separator ─────────────────────────────────────────────────────────────────
const SelectSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
  )
)
SelectSeparator.displayName = "SelectSeparator"

// ── Scroll buttons ────────────────────────────────────────────────────────────
const SelectScrollUpButton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
      <ChevronUp className="h-4 w-4" />
    </div>
  )
)
SelectScrollUpButton.displayName = "SelectScrollUpButton"

const SelectScrollDownButton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
      <ChevronDown className="h-4 w-4" />
    </div>
  )
)
SelectScrollDownButton.displayName = "SelectScrollDownButton"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
