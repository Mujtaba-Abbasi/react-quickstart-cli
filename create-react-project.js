#!/usr/bin/env node

import { join } from "path";
import { execSync } from "child_process";
import readline from "readline";
import { createFilesAndFolders } from "./createFileAndFolders.js";
import { validateProjectName } from "./constants.js";
import { installDependencies } from "./installDependencies.js";
import { addPackagesToPackageJson } from "./addPackages.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

const createProject = async () => {
  let projectName;
  while (true) {
    projectName = await question("Enter the project name: ");
    if (validateProjectName(projectName)) {
      break;
    } else {
      console.error(
        "Invalid project name. Use only letters, numbers, hyphens, and underscores."
      );
    }
  }

  const projectPath = join(process.cwd(), projectName);

  console.log(`Creating a new React project: ${projectName}`);
  execSync(`npm init vite@latest ${projectName} -- --template react-ts`, {
    stdio: "inherit",
  });

  addPackagesToPackageJson(projectPath);

  process.chdir(projectPath);

  console.log("Creating project structure...");
  createFilesAndFolders(projectPath);

  while (true) {
    const dependencyInstall = await question(
      "Do you want to install dependencies? (y/n): "
    );

    if (dependencyInstall === "y") {
      await installDependencies(question, projectPath);
      break;
    } else if (dependencyInstall === "n") {
      break;
    } else {
      console.error("Invalid input. Please enter 'y' or 'n'.");
    }
  }

  console.log("Project creation completed!");
  rl.close();
};

createProject();
