"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const t = useTranslations("CookieBanner");
  const needsConsent = useSyncExternalStore(
    (callback) => {
      window.addEventListener("cookie-consent-updated", callback);
      return () =>
        window.removeEventListener("cookie-consent-updated", callback);
    },
    () => !localStorage.getItem("cookie-consent"),
    () => false
  );

  function handleAccept() {
    localStorage.setItem("cookie-consent", "accepted");
    window.dispatchEvent(new Event("cookie-consent-updated"));
  }

  function handleDecline() {
    localStorage.setItem("cookie-consent", "declined");
    window.dispatchEvent(new Event("cookie-consent-updated"));
  }

  if (!needsConsent) return null;

  return (
    <div
      role="dialog"
      aria-label={t("message")}
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg md:p-6"
    >
      <div className="container mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground md:max-w-xl">
          {t("message")}{" "}
          <Link
            href="/integritetspolicy"
            className="underline hover:text-foreground"
          >
            {t("learnMore")}
          </Link>
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            {t("decline")}
          </Button>
          <Button size="sm" onClick={handleAccept}>
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
