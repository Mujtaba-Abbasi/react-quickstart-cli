import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { packages } from "./constants.js";

export const addPackagesToPackageJson = (projectPath) => {
  const packageJsonPath = join(projectPath, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

  packages.forEach((pkg) => {
    packageJson.dependencies[pkg] = "latest";
  });

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("Packages added to package.json");
};
