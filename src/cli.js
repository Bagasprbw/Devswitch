import { startInteractiveMenu } from "./menu.js";
import {
    addProjectQuick,
    deleteProject,
    listProjects,
    runProjectByName
} from "./projectManager.js";

export function cliHandler() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        return startInteractiveMenu();
    }

    const cmd = args[0];
    const name = args.slice(1).join(" ");

    switch (cmd) {
        case "projects":
            return listProjects();

        case "add":
            return addProjectQuick(name);

        case "del":
            return deleteProject(name);

        case "help":
            return showHelp();

        default:
            // devswitch <nama-project>
            return runProjectByName(cmd);
    }
}

function showHelp() {
    console.log(`
DevSwitch Commands:

devswitch                 → interactive menu
devswitch projects        → list projects
devswitch add <name>      → add project
devswitch del <name>      → delete project
devswitch <project-name>  → run project

Examples:
devswitch
devswitch projects
devswitch add RM-Trans
devswitch RM-Trans
`);
}
