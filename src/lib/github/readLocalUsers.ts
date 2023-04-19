import fs from "fs";
import path from "path";

import { UserType } from "@/types/user";

export default function readLocalUsers() {
  const filePath = path.join(process.cwd(), "data.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContent) as UserType[];
}
