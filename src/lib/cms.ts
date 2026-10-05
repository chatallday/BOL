import { useQuery } from "@tanstack/react-query";
import { useLang } from "./i18n";
import contentBlocks from "@/data/content_blocks.json";
import pages from "@/data/pages.json";
import dropoffs from "@/data/dropoffs.json";
import volunteer_needs from "@/data/volunteer_needs.json";
import donation_methods from "@/data/donation_methods.json";
import messages from "@/data/messages.json";

export type PageRow = {
  id: string; slug: string; label_en: string; label_es: string; title_en: string; title_es: string;
  body_en: string; body_es: string; sort_order: number; visible: boolean; is_system: boolean;
};

export const SYSTEM_PATHS: Record<string, string> = {
  home: "/", about: "/about", values: "/values", help: "/help", volunteer: "/volunteer",
  "drop-off": "/drop-off", donate: "/donate", contact: "/contact",
};
export const pagePath = (p: { slug: string; is_system: boolean }) =>
  p.is_system ? SYSTEM_PATHS[p.slug] ?? "/" : `/p/${p.slug}`;

const dataMap: Record<string, any[]> = {
  content_blocks: contentBlocks,
  pages: pages,
  dropoffs: dropoffs,
  volunteer_needs: volunteer_needs,
  donation_methods: donation_methods,
  messages: messages,
};

export function useRows<T = any>(table: string) {
  return useQuery({
    queryKey: [table],
    queryFn: async () => {
      const data = dataMap[table] ?? [];
      if (table === "content_blocks") {
        return data.sort((a, b) => a.key.localeCompare(b.key)) as T[];
      }
      if (table === "messages") {
        return data.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()) as T[];
      }
      return data.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)) as T[];
    },
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePages() {
  return useRows<PageRow>("pages");
}

/** Returns a getter for translated content blocks. */
export function useBlocks() {
  const { t } = useLang();
  const q = useRows<{ key: string; value_en: string; value_es: string }>("content_blocks");
  const map = new Map((q.data ?? []).map((r) => [r.key, r]));
  return (key: string, fallback = "") => {
    const r = map.get(key);
    return r ? t(r.value_en, r.value_es) : fallback;
  };
}