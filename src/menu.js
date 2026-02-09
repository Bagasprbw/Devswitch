import inquirer from "inquirer";
import { addProject, listProjects, startProject } from "./projectManager.js";

export async function startInteractiveMenu() {
    const { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "DevSwitch - Pilih Menu",
        choices: [
            { name: "➕ Tambah Project", value: "add" },
            { name: "📋 List Project", value: "list" },
            { name: "▶ Jalankan Project", value: "start" },
            { name: "❌ Keluar", value: "exit" }
        ]
    });

    if (action === "add") await addProject();
    if (action === "list") await listProjects();
    if (action === "start") await startProject();

    if (action !== "exit") {
        startInteractiveMenu();
    }
}
