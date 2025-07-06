const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "public");
const manifestPath = path.join(publicDir, "projects-manifest.json");

fs.readdir(publicDir, (err, files) => {
  if (err) {
    console.error("Error reading public folder:", err);
    process.exit(1);
  }

  const dbFiles = files.filter((f) => /^projects.*\.db$/.test(f));

  const manifest = {
    databases: dbFiles,
  };

  fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), (err) => {
    if (err) {
      console.error("Error writing manifest:", err);
      process.exit(1);
    }
    console.log(`Generated manifest with ${dbFiles.length} DB files.`);
  });
});
