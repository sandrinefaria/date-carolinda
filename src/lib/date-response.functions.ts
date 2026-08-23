import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const saveResponseSchema = z.object({
  activity: z.string(),
  note: z.string(),
  picked: z
    .object({ y: z.number(), m: z.number(), d: z.number() })
    .nullable()
    .optional(),
});

export const saveDateResponse = createServerFn({ method: "POST" })
  .validator((data) => saveResponseSchema.parse(data))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const { Database } = await import("@/integrations/supabase/types");

    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("Backend não configurado");

    const isNewFormatKey =
      key.startsWith("sb_publishable_") || key.startsWith("sb_secret_");

    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(
            typeof Request !== "undefined" && input instanceof Request
              ? input.headers
              : undefined,
          );
          if (init?.headers) {
            new Headers(init.headers).forEach((value, key) =>
              headers.set(key, value),
            );
          }
          if (isNewFormatKey && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { error } = await supabase.from("date_responses").insert({
      activity: data.activity,
      note: data.note,
      picked_year: data.picked?.y ?? null,
      picked_month: data.picked?.m ?? null,
      picked_day: data.picked?.d ?? null,
    });

    if (error) throw new Error(error.message);
    return { ok: true };
  });
