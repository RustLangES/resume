import fs from "fs/promises";
import path from "path";
import toml from "toml";

export async function readTOMLFiles(dir) {
  const files = await fs.readdir(dir);
  const tomlFiles = [];

  for (let file of files) {
    let filePath = path.join(dir, file);
    let stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      let subDirFiles = await readTOMLFiles(filePath);
      tomlFiles.push(...subDirFiles);
    } else if (file.endsWith(".toml")) {
      const content = await fs.readFile(filePath, "utf-8");
      const project = toml.parse(content);
      tomlFiles.push(project);
    }
  }
  return tomlFiles;
}
