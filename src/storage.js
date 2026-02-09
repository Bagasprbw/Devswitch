import fs from "fs";

const FILE = new URL("../projects.json", import.meta.url);

export function loadProjects() {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

export function saveProjects(projects) {
    fs.writeFileSync(FILE, JSON.stringify(projects, null, 2));
}
