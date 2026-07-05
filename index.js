import http from "http";
import { readFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact-me": "contact-me.html",
};

const server = http.createServer(async (req, res) => {
  const fileName = routes[req.url] || "404.html";
  const filePath = join(__dirname, fileName);

  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server error");
  }
});

server.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
