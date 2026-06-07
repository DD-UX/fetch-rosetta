"use client";

import { createContext, useContext, useId, useState } from "react";
import { cn } from "../lib/cn";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`<${component}> must be used inside <Tabs>`);
  }
  return context;
}

export interface TabsProps extends React.ComponentPropsWithRef<"div"> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const baseId = useId();
  const value = controlledValue ?? uncontrolledValue;

  const setValue = (next: string) => {
    setUncontrolledValue(next);
    onValueChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ value, setValue, baseId }}>
      <div className={cn("flex flex-col gap-2", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-lg bg-zinc-100 p-1",
        className,
      )}
      {...props}
    />
  );
}

export interface TabsTriggerProps extends React.ComponentPropsWithRef<"button"> {
  value: string;
}

export function TabsTrigger({ value, className, ...props }: TabsTriggerProps) {
  const context = useTabsContext("TabsTrigger");
  const selected = context.value === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${context.baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${context.baseId}-panel-${value}`}
      onClick={() => context.setValue(value)}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
        selected
          ? "bg-white text-zinc-900 shadow-sm"
          : "text-zinc-500 hover:text-zinc-900",
        className,
      )}
      {...props}
    />
  );
}

export interface TabsContentProps extends React.ComponentPropsWithRef<"div"> {
  value: string;
}

export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const context = useTabsContext("TabsContent");
  if (context.value !== value) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`${context.baseId}-panel-${value}`}
      aria-labelledby={`${context.baseId}-tab-${value}`}
      className={cn("focus-visible:outline-none", className)}
      {...props}
    />
  );
}
