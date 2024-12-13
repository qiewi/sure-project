"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false); // Change to false to hide navbar on scroll down
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
            opacity: 1,
            y: -100,
        }}
        animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
        }}
        transition={{
            duration: 0.2,
        }}
        className={cn(
            "flex max-w-fit fixed top-10 inset-x-4 mx-auto border rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] lg:px-20 px-10 py-5 items-center justify-center lg:space-x-8 space-x-4",
            "border-white/[0.6]",
            "backdrop-blur-md bg-gray-500/30", // Glassmorphism styles
            className
        )}
        >
        {navItems.map((navItem: any, idx: number) => (
            <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                    "relativeitems-center flex lg:space-x-4 sm:space-x-2 text-neutral-100 hover:text-white font-semibold"
                )}
            >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="md:text-sm text-[12px] !cursor-pointer">{navItem.name}</span>
            </Link>
        ))}
        <Link href="/home">
          <Button className="text-neutral-500 bg-white hover:bg-neutral-300 hover:text-white rounded-3xl border-black border-1">
            home
          </Button>
        </Link>
        </motion.div>
    </AnimatePresence>
  );
};
