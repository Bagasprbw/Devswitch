# DevSwitch

DevSwitch is a command-line interface (CLI) tool designed to simplify the process of running multiple development projects. It allows developers to start Laravel backend servers and Vue or React frontend servers using a single command.

This tool is intended for developers who frequently work with multiple projects and want a consistent, efficient workflow without repeatedly opening multiple terminals.

---

## Features

* Run Laravel backend servers using `php artisan serve`
* Run Vue or React frontend servers using `npm run dev` or `npm run serve`
* Automatically detects available npm scripts (`dev` or `serve`)
* Supports the following project types:

  * Backend only (Laravel)
  * Frontend only (Vue or React)
  * Fullstack (Frontend and Backend)
* Interactive menu mode
* Fast command-based execution
* Project management (add, list, delete)

---

## Installation (GitHub / Local)

DevSwitch is not yet published to npm. To install it locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/devswitch.git
```

2. Navigate to the project directory:

```bash
cd devswitch
```

3. Install dependencies:

```bash
npm install
```

4. Link the CLI globally:

```bash
npm link
```

After this, the `devswitch` command will be available globally.

---

## Usage

### Interactive Mode

Run the CLI with an interactive menu:

```bash
devswitch
```

Available options:

* Add Project
* List Projects
* Run Project
* Exit

---

### Add a Project (Quick Command)

```bash
devswitch add <project-name>
```

You will be prompted to enter:

* Frontend path (Vue or React) — optional
* Backend path (Laravel) — optional

At least one of the two paths must be provided.

---

### Run a Project

```bash
devswitch <project-name>
```

Example:

```bash
devswitch rm-trans
```

---

### List All Projects

```bash
devswitch projects
```

---

### Delete a Project

```bash
devswitch del <project-name>
```

---

### Help

```bash
devswitch help
```

---

## Path Input Examples

Frontend (Vue / React):

```text
D:\projects\my-vue-app
/home/user/projects/react-app
```

Backend (Laravel):

```text
D:\projects\my-laravel-app
/var/www/my-api
```

---

## How It Works

* If a frontend path is provided:

  * DevSwitch checks for `npm run dev`
  * If unavailable, it falls back to `npm run serve`
* If a backend path is provided:

  * DevSwitch runs `php artisan serve`
* If both frontend and backend are configured, both servers are started simultaneously

---

## Technology Stack

* Node.js (ES Modules)
* Inquirer
* Node.js Child Process API

---

## Roadmap

* Stop and restart running servers
* Automatically open browser and detect ports
* Custom commands per project
* GUI version (Electron or Tauri)

---

## Contributing

Contributions, issues, and feature requests are welcome.

---

## License

MIT License
