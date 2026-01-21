"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/helpers/utils";

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
}

export function BottomSheet({
  open,
  onOpenChange,
  children,
  title,
}: BottomSheetProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [currentY, setCurrentY] = React.useState(0);
  const [startY, setStartY] = React.useState(0);
  const [lastY, setLastY] = React.useState(0);
  const [lastTime, setLastTime] = React.useState(0);
  const [currentSnap, setCurrentSnap] = React.useState<"half" | "full">("half");
  const [viewportHeight, setViewportHeight] = React.useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );
  const sheetRef = React.useRef<HTMLDivElement>(null);
  const dragHandleRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Snap points: 25% = 75% visible (half), 0% = 100% visible (full)
  const snapPoints = React.useMemo(() => ({
    HALF: viewportHeight * 0.01, // 75% visible
    FULL: 0, // 100% visible
    CLOSED: viewportHeight, // Closed
  }), [viewportHeight]);

  const getSnapPoint = React.useCallback(
    (y: number, velocity: number = 0) => {
      const percentage = ((viewportHeight - y) / viewportHeight) * 100;

      // If dragged down more than 65%, close
      if (percentage < 35) return "closed";
      
      // Consider velocity for better UX
      if (velocity > 0.5) {
        // Fast downward drag
        if (percentage < 60) return "closed";
        if (currentSnap === "full" && percentage < 75) return "half";
      } else if (velocity < -0.5) {
        // Fast upward drag
        if (percentage > 70) return "full";
      }

      // Snap based on position
      if (percentage > 85) return "full";
      if (percentage < 50) {
        // Closer to closed or half
        return currentSnap === "full" ? "half" : "closed";
      }
      // Between 50-85%, decide based on current state and direction
      if (currentSnap === "half" && percentage > 62.5) return "full";
      if (currentSnap === "full" && percentage < 62.5) return "half";
      return currentSnap;
    },
    [viewportHeight, currentSnap]
  );

  const animateToSnapPoint = React.useCallback(
    (snap: "half" | "full" | "closed", animate = true, smooth = false) => {
      if (!sheetRef.current) return;

      let targetY = 0;
      switch (snap) {
        case "closed":
          targetY = snapPoints.CLOSED;
          break;
        case "half":
          targetY = snapPoints.HALF;
          setCurrentSnap("half");
          break;
        case "full":
          targetY = snapPoints.FULL;
          setCurrentSnap("full");
          break;
      }

      setCurrentY(targetY);

      if (!animate) {
        sheetRef.current.style.transform = `translateY(${targetY}px)`;
        return;
      }

      // Use smoother transition for all animations - movimento mais fluido e natural
      const duration = smooth ? "0.6s" : "0.5s"; // Duração um pouco maior para movimento mais suave
      const easing = smooth 
        ? "cubic-bezier(0.4, 0.0, 0.2, 1)" // Material Design ease-in-out - muito suave
        : "cubic-bezier(0.4, 0.0, 0.2, 1)"; // Mesma curva suave para todas as animações

      sheetRef.current.style.transition = `transform ${duration} ${easing}`;
      sheetRef.current.style.transform = `translateY(${targetY}px)`;

      const timeoutDuration = smooth ? 600 : 500;
      setTimeout(() => {
        if (sheetRef.current) {
          sheetRef.current.style.transition = "";
        }
        if (snap === "closed") {
          onOpenChange(false);
        }
      }, timeoutDuration);
    },
    [onOpenChange, snapPoints]
  );

  // Initialize position when opening
  React.useEffect(() => {
    if (open && sheetRef.current) {
      // Start from closed position
      setCurrentY(snapPoints.CLOSED);
      setCurrentSnap("half");
      
      // Animate to half position after a brief delay with smooth animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (sheetRef.current) {
            setCurrentY(snapPoints.HALF);
            // Animação suave e fluida na abertura - movimento natural
            sheetRef.current.style.transition =
              "transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)";
            sheetRef.current.style.transform = `translateY(${snapPoints.HALF}px)`;
            
            // Limpar transition após animação
            setTimeout(() => {
              if (sheetRef.current) {
                sheetRef.current.style.transition = "";
              }
            }, 600);
          }
        });
      });
    } else {
      setCurrentY(snapPoints.CLOSED);
    }
  }, [open, snapPoints]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    const isDragHandle =
      dragHandleRef.current?.contains(target) ||
      target.closest('[data-drag-handle]');

    // If not dragging from handle, check if content is scrolled
    if (!isDragHandle && contentRef.current) {
      if (contentRef.current.scrollTop > 0) {
        return; // Allow normal scrolling
      }
      // Check if touch is in the top 50px of the sheet (drag zone)
      const touchY = e.touches[0].clientY;
      const sheetTop = sheetRef.current?.getBoundingClientRect().top || 0;
      if (touchY - sheetTop > 50) {
        return; // Not in drag zone
      }
    }

    setIsDragging(true);
    const touchY = e.touches[0].clientY;
    setStartY(touchY);
    setLastY(touchY);
    setLastTime(Date.now());
    if (sheetRef.current) {
      sheetRef.current.style.transition = "";
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sheetRef.current) return;

    const now = Date.now();
    const currentTouchY = e.touches[0].clientY;
    const deltaY = currentTouchY - startY;

    // Calculate velocity
    const timeDelta = now - lastTime;
    const yDelta = currentTouchY - lastY;
    const velocity = timeDelta > 0 ? yDelta / timeDelta : 0;

    setLastY(currentTouchY);
    setLastTime(now);

    // Only drag if movement is significant
    if (Math.abs(deltaY) < 5) return;

    const newY = Math.max(0, Math.min(viewportHeight, currentY + deltaY));
    setCurrentY(newY);
    sheetRef.current.style.transform = `translateY(${newY}px)`;
    
    // Prevent default only if we're actually dragging significantly
    if (Math.abs(deltaY) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Calculate final velocity (simplified - just use recent movement)
    const timeDelta = Date.now() - lastTime;
    let finalVelocity = 0;
    if (timeDelta > 0 && timeDelta < 200) {
      finalVelocity = (currentY - lastY) / timeDelta;
      // Normalize velocity (px/ms to a simpler scale)
      finalVelocity *= 10;
    }

    const snap = getSnapPoint(currentY, finalVelocity);
    if (snap === "closed") {
      animateToSnapPoint("closed");
    } else {
      animateToSnapPoint(snap);
    }

    setStartY(0);
    setLastY(0);
    setLastTime(0);
  };

  // Handle drag on handle area
  const handleHandleClick = () => {
    if (!isDragging) {
      // Toggle between half and full
      animateToSnapPoint(currentSnap === "half" ? "full" : "half");
    }
  };

  // Prevent body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle scroll-based expansion/collapse
  React.useEffect(() => {
    if (!open || !contentRef.current) return;

    const content = contentRef.current;
    let lastScrollTop = content.scrollTop;
    let scrollTimeout: NodeJS.Timeout;
    let isExpanding = false;
    let isCollapsing = false;

    const handleScroll = () => {
      if (isDragging || isExpanding || isCollapsing) return;

      const scrollTop = content.scrollTop;
      const scrollHeight = content.scrollHeight;
      const clientHeight = content.clientHeight;
      const scrollDelta = scrollTop - lastScrollTop;

      // Threshold for detecting "near bottom" (70% scrolled)
      const nearBottomThreshold = scrollHeight * 0.7;
      const isNearBottom = scrollTop + clientHeight >= nearBottomThreshold;
      const isAtTop = scrollTop <= 5; // Small threshold for "at top"

      // Expand when scrolling down near bottom
      if (
        scrollDelta > 5 && // Minimum scroll delta to trigger
        isNearBottom &&
        currentSnap === "half"
      ) {
        clearTimeout(scrollTimeout);
        isExpanding = true;
        scrollTimeout = setTimeout(() => {
          animateToSnapPoint("full", true, true); // smooth = true para movimento mais fluido
          setTimeout(() => {
            isExpanding = false;
          }, 600); // Ajustado para corresponder à duração da animação
        }, 150); // Delay mantido para evitar animações muito frequentes
      }

      // Collapse when at top and scrolling up
      if (
        scrollDelta < -5 && // Minimum scroll delta to trigger
        isAtTop &&
        currentSnap === "full"
      ) {
        clearTimeout(scrollTimeout);
        isCollapsing = true;
        scrollTimeout = setTimeout(() => {
          animateToSnapPoint("half", true, true); // smooth = true para movimento mais fluido
          setTimeout(() => {
            isCollapsing = false;
          }, 600); // Ajustado para corresponder à duração da animação
        }, 150); // Delay mantido para evitar animações muito frequentes
      }

      lastScrollTop = scrollTop;
    };

    content.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      content.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [open, currentSnap, isDragging, animateToSnapPoint]);

  // Update viewport height on resize
  React.useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight;
      setViewportHeight(vh);
      // Update current position based on snap state
      if (open && currentSnap === "half") {
        setCurrentY(vh * 0.7);
      } else if (open && currentSnap === "full") {
        setCurrentY(0);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open, currentSnap]);

  if (!open) return null;

  const visiblePercentage = ((viewportHeight - currentY) / viewportHeight) * 100;
  const maxContentHeight =
    currentSnap === "full" ? "calc(100vh - 100px)" : "calc(70vh - 100px)";

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => animateToSnapPoint("closed")}
        style={{
          opacity: Math.min(visiblePercentage / 100, 0.6),
        }}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl shadow-2xl"
        style={{
          transform: `translateY(${currentY}px)`,
          maxHeight: "100vh",
          touchAction: "pan-y",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle */}
        <div
          ref={dragHandleRef}
          data-drag-handle
          onClick={handleHandleClick}
          className="flex items-center justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
          onTouchStart={(e) => {
            handleTouchStart(e);
          }}
        >
          <div
            className={cn(
              "w-12 h-1.5 rounded-full bg-muted-foreground/30 transition-all duration-200",
              isDragging && "bg-muted-foreground/50 w-16"
            )}
          />
        </div>

        {/* Header with Close Button */}
        <div className="flex items-center justify-between px-6 pb-2">
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          <button
            onClick={() => animateToSnapPoint("closed")}
            className="ml-auto rounded-full p-2 hover:bg-muted active:bg-muted/80 transition-colors touch-manipulation"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          data-content
          className="overflow-y-auto overscroll-contain scroll-smooth"
          style={{
            maxHeight: maxContentHeight,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
