"use client";

import { Button, Group } from "@mantine/core";
import Link from "next/link";
import type { Lang } from "@/lib/i18n/dictionaries";

const STORAGE_KEY = "gfazioli-lang-pref";

interface LanguageSwitcherProps {
  current: Lang;
}

export function LanguageSwitcher({ current }: LanguageSwitcherProps) {
  const setPref = (lang: Lang) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  return (
    <Group gap={4}>
      <Button
        component={Link}
        href="/"
        variant={current === "en" ? "filled" : "subtle"}
        size="compact-sm"
        onClick={() => setPref("en")}
      >
        EN
      </Button>
      <Button
        component={Link}
        href="/it/"
        variant={current === "it" ? "filled" : "subtle"}
        size="compact-sm"
        onClick={() => setPref("it")}
      >
        IT
      </Button>
    </Group>
  );
}
