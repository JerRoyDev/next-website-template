"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone } from "lucide-react";

interface MailPreviewSheetProps {
  preview: { notification: string; confirmation: string };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MailPreviewSheet({
  preview,
  open,
  onOpenChange,
}: MailPreviewSheetProps) {
  const t = useTranslations("MailPreview");
  const [tab, setTab] = useState<"notification" | "confirmation">(
    "notification"
  );
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col w-[90vw] max-w-[90vw]! h-[90vh] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant={tab === "notification" ? "default" : "outline"}
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => setTab("notification")}
            >
              {t("notification")}
            </Button>
            <Button
              variant={tab === "confirmation" ? "default" : "outline"}
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => setTab("confirmation")}
            >
              {t("confirmation")}
            </Button>
          </div>
          <div className="flex gap-1 rounded-md border p-0.5 shrink-0">
            <Button
              variant={viewport === "desktop" ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={() => setViewport("desktop")}
              title="Desktop"
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={viewport === "mobile" ? "secondary" : "ghost"}
              size="icon-sm"
              onClick={() => setViewport("mobile")}
              title="Mobil"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 min-h-0 overflow-auto">
          <iframe
            srcDoc={
              tab === "notification"
                ? preview.notification
                : preview.confirmation
            }
            className="rounded-md border h-full shrink-0"
            style={{ width: viewport === "mobile" ? "min(390px, 100%)" : "max(700px, 100%)" }}
            title={t(tab)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
