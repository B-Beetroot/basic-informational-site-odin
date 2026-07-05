import http from "http";
import { readFile } from "fs/promises";

const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact-me": "contact-me.html",
};

const server = http.createServer(async (req, res) => {
  const fileName = routes[req.url] || "404.html";
  const filePath = new URL(`./${fileName}`, import.meta.url);

  try {
    const data = await readFile(filePath);

    res.writeHead(routes[req.url] ? 200 : 404, {
      "Content-Type": "text/html",
    });

    res.end(data);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server error");
  }
});

server.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
