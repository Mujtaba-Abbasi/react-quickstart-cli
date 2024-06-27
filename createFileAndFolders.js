import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileContents, filesAndFoldersList } from "./constants.js";

export const createFilesAndFolders = (workingDir) => {
  filesAndFoldersList.forEach((path) => {
    const fullPath = join(workingDir, path);

    if (path.includes(".")) {
      const dir = dirname(fullPath);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      const content = fileContents[path] || "";
      writeFileSync(fullPath, content);
      console.log(`Created file: ${path}`);
    } else {
      if (!existsSync(fullPath)) {
        mkdirSync(fullPath, { recursive: true });
        console.log(`Created folder: ${path}`);
        const indexFile = join(fullPath, "index.ts");
        writeFileSync(indexFile, "");
      }
    }
  });
};
