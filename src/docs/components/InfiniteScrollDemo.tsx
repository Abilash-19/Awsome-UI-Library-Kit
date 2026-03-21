import React, { useState, useCallback } from "react";
import { ScrollArea, ScrollElement } from "@/components/ScrollArea";
import { useTheme } from "@/theme";

export const InfiniteScrollDemo: React.FC = () => {
  const { theme } = useTheme();
  const [items, setItems] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      title: `Item ${i + 1}`,
      type: (["up", "fade", "scale", "blur", "left", "right"] as const)[i % 6],
    })),
  );
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => {
        const start = prev.length;
        const next = Array.from({ length: 5 }, (_, i) => ({
          id: start + i + 1,
          title: `Item ${start + i + 1}`,
          type: (["up", "fade", "scale", "blur", "left", "right"] as const)[
            (start + i) % 6
          ],
        }));
        return [...prev, ...next];
      });
      setLoading(false);
    }, 600);
  }, [loading]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
        loadMore();
      }
    },
    [loadMore],
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-xs font-medium"
          style={{ color: theme.tokens.foregroundMuted }}
        >
          {items.length} items loaded
        </span>
        <span
          className="text-[10px]"
          style={{ color: theme.tokens.foregroundMuted }}
        >
          Scroll to bottom to load more
        </span>
      </div>
      <ScrollArea
        className="h-72 border rounded-lg p-3 w-full"
        style={{ borderColor: theme.tokens.border }}
        onScroll={handleScroll}
      >
        <div className="space-y-2">
          {items.map((item) => (
            <ScrollElement key={item.id} revealType={item.type}>
              <div
                className="p-3 border rounded-lg text-sm flex items-center justify-between"
                style={{
                  borderColor: theme.tokens.border,
                  backgroundColor: theme.tokens.surface,
                }}
              >
                <span className="font-medium">{item.title}</span>
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: `${theme.palette.primary[500]}12`,
                    color: theme.palette.primary[500],
                  }}
                >
                  {item.type}
                </span>
              </div>
            </ScrollElement>
          ))}
          {loading && (
            <div
              className="p-3 text-center text-xs"
              style={{ color: theme.tokens.foregroundMuted }}
            >
              Loading more...
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
