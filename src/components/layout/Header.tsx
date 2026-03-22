"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import type { Locale } from "@/i18n/routing";

const navItems = [
  { href: "/", label: "home" },
  { href: "/om-oss", label: "about" },
  { href: "/tjanster", label: "services" },
  { href: "/blogg", label: "blog" },
  { href: "/faq", label: "faq" },
  { href: "/kontakt", label: "contact" },
] as const;

export function Header() {
  const t = useTranslations("Navigation");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function switchLocale() {
    const nextLocale: Locale = locale === "sv" ? "en" : "sv";
    // usePathname() returns the resolved path (e.g. /blogg/my-post).
    // next-intl router resolves it to the correct locale route at runtime.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: nextLocale });
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          {process.env.NEXT_PUBLIC_SITE_NAME ?? "Logo"}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-foreground ${
                pathname === item.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {t(item.label)}
            </Link>
          ))}
          <Button variant="ghost" size="sm" onClick={switchLocale}>
            {locale === "sv" ? "EN" : "SV"}
          </Button>
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Menu" />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  {process.env.NEXT_PUBLIC_SITE_NAME ?? "Menu"}
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4" aria-label="Mobile">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`text-lg transition-colors hover:text-foreground ${
                      pathname === item.href
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {t(item.label)}
                  </Link>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    switchLocale();
                    setOpen(false);
                  }}
                  className="w-fit"
                >
                  {locale === "sv" ? "English" : "Svenska"}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
