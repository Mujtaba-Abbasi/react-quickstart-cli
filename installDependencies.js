import { execSync, exec } from "child_process";
import { join } from "path";
import { readFileSync, writeFileSync } from "fs";
import { packages } from "./constants.js";

export const installDependencies = async (question, projectPath) => {
  let packageManager;

  while (true) {
    packageManager = await question(
      "Select package manager (npm/pnpm/yarn/bun): "
    );

    if (
      ["npm", "pnpm", "yarn", "bun"].includes(packageManager?.toLowerCase())
    ) {
      break;
    } else if (packageManager === "exit") {
      console.log("Exiting...");
      return;
    } else {
      console.error(
        "Invalid package manager selected. Please try again or type 'exit' to quit."
      );
    }
  }

  try {
    execSync(`${packageManager} --version`, { stdio: "ignore" });
    console.log(`${packageManager} is already installed.`);
  } catch (error) {
    console.log(`${packageManager} is not installed. Installing...`);
    await new Promise((resolve, reject) => {
      exec(`npm install -g ${packageManager}`, (err) => {
        if (err) {
          console.error(`Failed to install ${packageManager}:`, err);
          reject(err);
        } else {
          console.log(`${packageManager} installed successfully.`);
          resolve();
        }
      });
    });
  }

  console.log(`Installing dependencies using ${packageManager}...`);
  execSync(`${packageManager} install`, { stdio: "inherit" });

  updatePackageVersions(projectPath);
};

const updatePackageVersions = (projectPath) => {
  packages.forEach((packageName) => {
    try {
      const installedVersion = execSync(`npm show ${packageName} version`, {
        encoding: "utf8",
      }).trim();

      const packageJsonPath = join(projectPath, "package.json");
      const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
      packageJson.dependencies[packageName] = installedVersion;
      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      console.log(
        `Updated ${packageName} to version ${installedVersion} in package.json`
      );
    } catch (error) {
      console.error(
        `Failed to update ${packageName} version in package.json:`,
        error
      );
    }
  });
};
