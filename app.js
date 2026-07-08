import express from "express";
import path from "path";

const app = express();
const pagesDir = import.meta.dirname;
const PORT = 3000;

const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact-me": "contact-me.html",
};

for (const route in routes) {
  app.get(route, (req, res) => {
    res.sendFile(path.join(pagesDir, routes[route]));
  });
}

app.use((req, res) => {
  res.status(404).sendFile(path.join(pagesDir, "404.html"));
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server running at http://localhost:${PORT}!`);
});
