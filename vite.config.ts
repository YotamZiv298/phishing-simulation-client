import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

const resolvedPaths = [
  { alias: "@", path: "./src" },
  { alias: "@api", path: "./src/api" },
  { alias: "@assets", path: "./src/assets" },
  { alias: "@components", path: "./src/components" },
  { alias: "@containers", path: "./src/containers" },
  { alias: "@context", path: "./src/context" },
  { alias: "@hooks", path: "./src/hooks" },
  { alias: "@shared", path: "./src/shared" },
  { alias: "@stores", path: "./src/stores" },
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: resolvedPaths.map((resolvedPath) => ({
      find: resolvedPath.alias,
      replacement: fileURLToPath(new URL(resolvedPath.path, import.meta.url)),
    })),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string, { getModuleInfo }): string | undefined {
          const match: RegExpExecArray | null = /.*\.strings\.(\w+)\.js/.exec(
            id,
          );

          if (match === null) {
            return;
          }

          const language: string = match[1];
          const dependentEntryPoints: string[] = [];
          const idsToHandle: Set<string> = new Set<string>(
            getModuleInfo(id)?.dynamicImporters,
          );

          idsToHandle.forEach((moduleId: string) => {
            const moduleInfo = getModuleInfo(moduleId);

            if (moduleInfo === null) {
              return;
            }

            const { isEntry, dynamicImporters, importers } = moduleInfo;

            if (isEntry || dynamicImporters.length > 0) {
              dependentEntryPoints.push(moduleId);
            }

            for (const importerId of importers) {
              idsToHandle.add(importerId);
            }
          });

          if (dependentEntryPoints.length === 1) {
            return `${dependentEntryPoints[0].split("/").slice(-1)[0].split(".")[0]}.strings.${language}`;
          }

          if (dependentEntryPoints.length > 1) {
            return `shared.strings.${language}`;
          }
        },
      },
    },
  },
});
