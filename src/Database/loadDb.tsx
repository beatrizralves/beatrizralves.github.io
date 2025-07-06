// src/utils/loadDb.ts

import { Folder } from "lucide-react";
import initSqlJs, { Database } from "sql.js";

export async function loadDatabase(): Promise<Database> {
  //dont forget the public/sql-wasm.wasm sacado do node_modules/sql.js/dist/sql-wasm.wasm
  //cada vez quse se fizer dowbnload da bd e meter no public fazer npm run build e depois npm start
  const SQL = await initSqlJs({
    locateFile: (file) => `${process.env.PUBLIC_URL}/${file}`,
  });
  // -------------------------------------------------------------
  const manifestResponse = await fetch(
    `${process.env.PUBLIC_URL}/projects-manifest.json`
  );
  const manifest = await manifestResponse.json();

  const dbFilename = manifest.databases.find((name: any) =>
    name.startsWith("projects")
  );
  if (!dbFilename) throw new Error("No projects DB found");

  const response = await fetch(`${process.env.PUBLIC_URL}/${dbFilename}`);

  //   -----------------------------------------------------------

  //   const response = await fetch(`./projects.db`);
  const buffer = await response.arrayBuffer();
  const db = new SQL.Database(new Uint8Array(buffer));

  //   db.run("PRAGMA foreign_keys = OFF;");
  //   db.run("DROP TABLE IF EXISTS project_tags;");
  //   db.run("DROP TABLE IF EXISTS projects;");
  //   db.run("DROP TABLE IF EXISTS tags;");

  // FAZER npm run build cada vez q se faz download e se mete um nova db no public Folder tem que se apagar a antiga
  // e o nome deve comecar por projects

  db.run("PRAGMA foreign_keys = ON;");

  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY,
      title TEXT,
      image_base64 TEXT,
      description TEXT,
      demo_url TEXT,
      code_url TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS project_tags (
      id INTEGER PRIMARY KEY,
      project_id INTEGER,
      tag_id INTEGER,
      FOREIGN KEY (project_id) REFERENCES projects(id),
      FOREIGN KEY (tag_id) REFERENCES tags(id)
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY,
      name TEXT,
      icon_base64 TEXT
    );
  `);

  //   db.run(
  //     `INSERT INTO projects (title, image_base64,description,demo_url,code_url) VALUES (?, ?, ?, ?, ?)`,
  //     ["P1", "img", "desc", "u1", "u2"]
  //   );
  //   db.run(
  //     `INSERT INTO projects (title, image_base64,description,demo_url,code_url) VALUES (?, ?, ?, ?, ?)`,
  //     ["P2", "img", "desc", "u1", "u2"]
  //   );

  //   db.run(`INSERT INTO tags (name, icon_base64) VALUES (?, ?)`, ["js", "img"]);

  //   db.run(`INSERT INTO project_tags (project_id, tag_id) VALUES (?, ?)`, [1, 1]);
  //   db.run(`INSERT INTO project_tags (project_id, tag_id) VALUES (?, ?)`, [2, 1]);

  return db;
}
