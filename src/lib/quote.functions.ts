import { createServerFn } from "@tanstack/react-start";

import { quoteSchema } from "./quote-schema";

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => quoteSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("quote_requests").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      service_type: data.serviceType,
      vehicle_year: data.vehicleYear || null,
      vehicle_make: data.vehicleMake || null,
      vehicle_model: data.vehicleModel || null,
      message: data.message || null,
    });

    if (error) {
      throw new Error("We couldn't save your request. Please call us at (732) 693-5154.");
    }

    const resendKey = process.env["RESEND_API_KEY"];
    if (resendKey) {
      const lines = [
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Service: ${data.serviceType}`,
        `Vehicle: ${[data.vehicleYear, data.vehicleMake, data.vehicleModel].filter(Boolean).join(" ") || "Not provided"}`,
        `Notes: ${data.message || "None"}`,
      ];
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Slick Auto Spa <onboarding@resend.dev>",
            to: ["slickautospa@gmail.com"],
            reply_to: data.email,
            subject: `New quote request — ${data.serviceType}`,
            text: lines.join("\n"),
          }),
        });
      } catch {
        // Lead is already stored; notification failure must not break the form.
      }
    }

    return { success: true as const };
  });
