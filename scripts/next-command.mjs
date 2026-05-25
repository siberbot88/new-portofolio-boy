import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const command =
  process.platform === "win32"
    ? {
        file: "powershell",
        args: [
          "-NoProfile",
          "-ExecutionPolicy",
          "Bypass",
          "-File",
          join(root, "scripts", "next-clean-path.ps1"),
          ...args
        ]
      }
    : {
        file: process.execPath,
        args: [join(root, "node_modules", "next", "dist", "bin", "next"), ...args]
      };

const result = spawnSync(command.file, command.args, {
  cwd: root,
  stdio: "inherit",
  shell: false
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
