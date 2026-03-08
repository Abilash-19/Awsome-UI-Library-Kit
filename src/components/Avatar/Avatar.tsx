import { forwardRef, useState } from "react";
import { cn } from "@/utils";
import { useTheme } from "@/theme";
import type { AvatarProps } from "./Avatar.types";
import { Skeleton } from "../Skeleton";

const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const {
    id,
    src,
    alt,
    displayName,
    size = "medium",
    shape = "circle",
    className,
    style,
    badge,
    onBadgeClick,
    isLoading,
  } = props;
  const [hasError, setHasError] = useState(false);
  const { theme } = useTheme();

  const getInitials = (name: string) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "";
  };

  const sizeStyles = {
    small: "h-6 w-6 text-[11px]",
    medium: "h-8 w-8 text-[13px]",
    large: "h-10 w-10 text-[15px]",
  };

  const shapeStyles = {
    circle: "rounded-full",
    square: "rounded-md",
  };

  const fallBack = !src || hasError;

  return (
    <div
      ref={ref}
      id={id}
      aria-label={displayName || "Avatar"}
      className={cn(
        "relative inline-flex shrink-0 select-none ",
        sizeStyles[size],
        className,
      )}
      style={style}
    >
      {isLoading ? (
        <Skeleton
          variant={shape === "circle" ? "circular" : "rounded"}
          width="100%"
          height="100%"
        />
      ) : (
        <div
          className={cn(
            "h-full w-full flex items-center justify-center overflow-hidden shadow-sm",
            fallBack && "border",
            shapeStyles[shape],
          )}
          style={{
            backgroundColor: fallBack
              ? `${theme.palette.primary[500]}1A`
              : "transparent",
            borderColor: fallBack
              ? `${theme.palette.primary[500]}33`
              : "transparent",
            color: theme.palette.primary[500],
          }}
        >
          {src && !fallBack ? (
            <img
              src={src}
              alt={alt || displayName}
              className="h-full w-full object-cover"
              onError={() => setHasError(true)}
              aria-label={displayName || "Avatar"}
            />
          ) : (
            <span className="font-medium uppercase leading-none select-none">
              {displayName ? getInitials(displayName) : "?"}
            </span>
          )}
        </div>
      )}

      {badge && (
        <div
          className={cn(
            "absolute  flex items-center justify-center",
            shape === "circle"
              ? "bottom-[2%] end-[2%]"
              : "bottom-0 end-0 translate-x-1/4 translate-y-1/4",
          )}
          onClick={onBadgeClick}
        >
          {badge}
        </div>
      )}
    </div>
  );
});

export default Avatar;
