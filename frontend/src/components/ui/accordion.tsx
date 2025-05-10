"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface AccordionContextProps {
  openIndex: number | null;
  setOpenIndex: (idx: number | null) => void;
}

const AccordionContext = React.createContext<AccordionContextProps | undefined>(
  undefined
);

function Accordion({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      <div className={cn("flex flex-col gap-5", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}
Accordion.displayName = "Accordion";

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

function AccordionItem({
  children,
  className,
  index,
  ...props
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        // index prop-u Trigger və Content-ə ötür
        return React.cloneElement(child, { index });
      })}
    </div>
  );
}
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  index?: number;
  icon?: React.ReactNode;
}

function AccordionTrigger({
  children,
  className,
  index,
  icon,
  ...props
}: AccordionTriggerProps) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx || typeof index !== "number") return null;
  const isOpen = ctx.openIndex === index;
  function handleClick() {
    ctx.setOpenIndex(isOpen ? null : index);
  }
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={handleClick}
      className={cn(
        "flex w-full items-center justify-between px-6 py-5 bg-white rounded-xl text-base md:text-lg font-semibold text-zinc-900 transition-colors duration-200 hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-primary/30 border-none outline-none",
        className
      )}
      {...props}
    >
      <span className="text-left flex-1 select-none">{children}</span>
      {icon && (
        <span
          className={cn(
            "ml-4 flex items-center text-2xl text-zinc-400 transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
          {icon}
        </span>
      )}
    </button>
  );
}
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number;
}

function AccordionContent({
  children,
  className,
  index,
  ...props
}: AccordionContentProps) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx || typeof index !== "number") return null;
  const isOpen = ctx.openIndex === index;
  return (
    <div
      className={cn(
        "px-6 pb-5 pt-2 bg-white rounded-b-xl text-zinc-700 text-base md:text-lg leading-relaxed border-t border-zinc-100 transition-all duration-300",
        isOpen ? "block" : "hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
