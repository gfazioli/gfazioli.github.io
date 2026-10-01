"use client";

/**
 * MantineProvider with the color scheme pinned to COLOR_SCHEME.
 * A client component because the storage-free color scheme manager is made of
 * functions, which cannot cross the server → client boundary as props.
 */

import {
  MantineProvider,
  type MantineColorSchemeManager,
  type MantineThemeOverride,
} from "@mantine/core";
import { COLOR_SCHEME } from "@/lib/colorScheme";

const fixedColorSchemeManager: MantineColorSchemeManager = {
  get: () => COLOR_SCHEME,
  set: () => {},
  subscribe: () => {},
  unsubscribe: () => {},
  clear: () => {},
};

export function MantineRoot({
  theme,
  children,
}: {
  theme: MantineThemeOverride;
  children: React.ReactNode;
}) {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme={COLOR_SCHEME}
      forceColorScheme={COLOR_SCHEME}
      colorSchemeManager={fixedColorSchemeManager}
    >
      {children}
    </MantineProvider>
  );
}
