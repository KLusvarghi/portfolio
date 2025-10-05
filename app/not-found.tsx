"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme/theme-context";
import Image from "next/image";

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] text-center pt-20">
      <div className="flex items-center justify-center">
        <Image
          src={
            theme === "dark"
              ? "/images/notFount-dark.svg"
              : "/images/notFount-light.svg"
          }
          alt="No articles found"
          width={200}
          height={200}
          className="object-cover md:w-80"
        />
      </div>
      <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
