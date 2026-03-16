"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="sv">
      <body className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl font-bold">500</h1>
        <h2 className="mt-4 text-2xl font-semibold">Något gick fel</h2>
        <p className="mt-2 text-muted-foreground">
          Ett oväntat fel uppstod. Försök igen.
        </p>
        <Button className="mt-8" onClick={reset}>
          Försök igen
        </Button>
      </body>
    </html>
  );
}
