import inquirer from "inquirer";
import { loadProjects, saveProjects } from "./storage.js";
import { runProject } from "./runner.js";

export async function addProject() {
    const answersName = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Nama project:"
        }
    ]);

    console.log("\n📁 Path Frontend (Vue / React)");
    console.log(
        "Contoh: D:\\projects\\my-vue-app | /home/user/projects/react-app (boleh dikosongkan)\n"
    );

    const fe = await inquirer.prompt([
        {
            type: "input",
            name: "frontendPath",
            message: "Frontend path:"
        }
    ]);


    console.log("\n📁 Path Backend (Laravel)");
    console.log(
        "Contoh: D:\\projects\\my-laravel-app | /var/www/my-api (boleh dikosongkan)\n"
    );

    const be = await inquirer.prompt([
        {
            type: "input",
            name: "backendPath",
            message: "Backend path:"
        }
    ]);


    if (!fe.frontendPath && !be.backendPath) {
        console.log("❌ Minimal isi frontend ATAU backend");
        return;
    }

    const projects = loadProjects();

    projects.push({
        name: answersName.name,
        frontendPath: sanitizePath(fe.frontendPath) || null,
        backendPath: sanitizePath(be.backendPath) || null
    });

    saveProjects(projects);
    console.log(`✅ Project '${answersName.name}' berhasil ditambahkan`);
}



export function listProjects() {
    const projects = loadProjects();

    if (projects.length === 0) {
        console.log("❌ Belum ada project");
        return;
    }

    console.log("\n📋 Daftar Project:\n");

    projects.forEach((p, i) => {
        console.log(`${i + 1}. ${p.name}`);
        console.log(`   FE: ${p.frontendPath || "-"}`);
        console.log(`   BE: ${p.backendPath || "-"}`);
        console.log("");
    });
}


export async function startProject() {
    const projects = loadProjects();

    if (projects.length === 0) {
        console.log("❌ Belum ada project");
        return;
    }

    const { projectName } = await inquirer.prompt({
        type: "list",
        name: "projectName",
        message: "Pilih project:",
        choices: projects.map(p => p.name)
    });

    const project = projects.find(p => p.name === projectName);
    runProject(project);
}

// quick add
export async function addProjectQuick(name) {
    if (!name) {
        console.log("❌ Nama project wajib");
        return;
    }

    console.log("\n📁 Path Frontend (Vue / React)");
    console.log(
        "Contoh: D:\\projects\\my-vue-app | /home/user/projects/react-app (boleh dikosongkan)\n"
    );

    const fe = await inquirer.prompt([
        {
            type: "input",
            name: "frontendPath",
            message: "Frontend path:"
        }
    ]);


    console.log("\n📁 Path Backend (Laravel)");
    console.log(
        "Contoh: D:\\projects\\my-laravel-app | /var/www/my-api (boleh dikosongkan)\n"
    );

    const be = await inquirer.prompt([
        {
            type: "input",
            name: "backendPath",
            message: "Backend path:"
        }
    ]);


    if (!fe.frontendPath && !be.backendPath) {
        console.log("❌ Minimal isi frontend ATAU backend");
        return;
    }

    const projects = loadProjects();

    projects.push({
        name,
        frontendPath: sanitizePath(fe.frontendPath) || null,
        backendPath: sanitizePath(be.backendPath) || null
    });

    saveProjects(projects);
    console.log(`✅ Project '${name}' berhasil ditambahkan`);
}



export function deleteProject(name) {
    if (!name) {
        console.log("❌ Nama project wajib");
        return;
    }

    let projects = loadProjects();
    const before = projects.length;

    projects = projects.filter(
        p => p.name.toLowerCase() !== name.toLowerCase()
    );

    if (projects.length === before) {
        console.log(`❌ Project '${name}' tidak ditemukan`);
        return;
    }

    saveProjects(projects);
    console.log(`🗑 Project '${name}' berhasil dihapus`);
}

export function runProjectByName(name) {
    if (!name) {
        console.log("❌ Nama project wajib");
        return;
    }

    const projects = loadProjects();
    const project = projects.find(
        p => p.name.toLowerCase() === name.toLowerCase()
    );

    if (!project) {
        console.log(`❌ Project '${name}' tidak ditemukan`);
        return;
    }

    runProject(project);
}

/* =====================================================
   UTIL
===================================================== */

function sanitizePath(path) {
    if (!path) return path;
    return path.replace(/^["']|["']$/g, "");
}
