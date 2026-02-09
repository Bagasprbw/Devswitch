import { spawn } from "child_process";
import fs from "fs";
import path from "path";

function run(command, args, cwd) {
    return spawn(command, args, {
        cwd,
        stdio: "inherit",
        shell: true
    });
}

function getFrontendCommand(frontendPath) {
    const pkgPath = path.join(frontendPath, "package.json");

    if (!fs.existsSync(pkgPath)) {
        console.log("❌ package.json tidak ditemukan di frontend");
        return null;
    }

    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    const scripts = pkg.scripts || {};

    if (scripts.dev) {
        console.log("🟢 Frontend: npm run dev");
        return ["npm", ["run", "dev"]];
    }

    if (scripts.serve) {
        console.log("🟡 Frontend: npm run serve");
        return ["npm", ["run", "serve"]];
    }

    console.log("❌ Tidak ada script dev / serve di frontend");
    return null;
}

export function runProject(project) {
    console.log(`🚀 Menjalankan ${project.name}`);

    if (project.backendPath) {
        console.log("🟢 Menjalankan Backend (Laravel)");
        run("php", ["artisan", "serve"], project.backendPath);
    } else {
        console.log("⚪ Backend tidak ada, dilewati");
    }

    if (project.frontendPath) {
        const frontendCmd = getFrontendCommand(project.frontendPath);
        if (frontendCmd) {
            const [cmd, args] = frontendCmd;
            console.log("🟢 Menjalankan Frontend");
            run(cmd, args, project.frontendPath);
        }
    } else {
        console.log("⚪ Frontend tidak ada, dilewati");
    }
}

