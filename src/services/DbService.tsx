import { Database } from "sql.js";

export interface Project {
  id: number;
  title?: string;
  image_base64?: string;
  description?: string;
  demo_url?: string;
  code_url?: string;
}
export async function getAllProjects(db: Database): Promise<Project[]> {
  const result = db.exec("SELECT * FROM projects");
  if (result.length > 0) {
    const columns = result[0].columns;
    const values = result[0].values;
    const rows = values.map((row: any[]) =>
      Object.fromEntries(columns.map((col: any, i: any) => [col, row[i]]))
    );
    return rows;
  }
  return [];
}

export function downloadDb(db: Database) {
  if (!db) return;

  // Export DB to Uint8Array
  const data = db.export();

  // Create blob from Uint8Array
  const blob = new Blob([data], { type: "application/x-sqlite3" });

  // Create download URL
  const url = window.URL.createObjectURL(blob);

  // Create a temporary <a> element and trigger click
  const a = document.createElement("a");
  a.href = url;
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // months are zero-based
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formatted = `${year}-${month}-${day}_${hours}_${minutes}`;
  a.download = `projects_${formatted}.db`; // file name for download
  a.click();

  // Clean up the URL object
  window.URL.revokeObjectURL(url);
}

export interface CreateProjectDto {
  title?: string;
  image_base64?: string;
  description?: string;
  demo_url?: string;
  code_url?: string;
}

export function addProjectToDB(db: Database, p: CreateProjectDto): Database {
  return db.run(
    `INSERT INTO projects (title, image_base64,description,demo_url,code_url) VALUES (?, ?, ?, ?, ?)`,
    [
      p.title ?? null,
      p.image_base64 ?? null,
      p.description ?? null,
      p.demo_url ?? null,
      p.code_url ?? null,
    ]
  );
}

export function deleteProject(db: Database, id: number) {
  return db.run(`DELETE FROM projects WHERE id = ?`, [id]);
}
