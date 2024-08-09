// IN EXPRESS
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));

app.get("/:page?", (req, res) => {
  let page = req.params.page || "index";
  let filePath = path.join(__dirname, "public", `${page}.html`);

  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Page not found
        res.status(400).sendFile(path.join(__dirname, "public", "404.html"));
      } else {
        // Server error
        res.status(500).send(`Server Error: ${err.code}: ${err.message}`);
      }
    } else {
      // Success
      res.setHeader("Content-Type", "text/html");
      res.status(200).sendFile(filePath);
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));

// IN NODEJS
// const http = require("http");
// const path = require("path");
// const fs = require("fs");

// const PORT = process.env.PORT || 8080;

// const server = http.createServer((req, res) => {
//   // Build file path
//   let filePath = path.join(
//     __dirname,
//     "public",
//     req.url === "/" ? "index.html" : req.url
//   );

//   // Get file extension
//   let extname = path.extname(filePath);
//   if (!extname) {
//     filePath += ".html";
//     extname = ".html";
//   }

//   // Set Content-Type
//   let contentType = "text/html";
//   switch (extname) {
//     case ".js":
//       contentType = "text/javascript";
//       break;
//     case ".css":
//       contentType = "text/css";
//       break;
//     case ".json":
//       contentType = "application/json";
//       break;
//     case ".png":
//       contentType = "image/png";
//       break;
//     case "jpg":
//     case "jpeg":
//       contentType = "image/jpg";
//       break;
//   }

//   // Read file
//   fs.readFile(filePath, (err, content) => {
//     if (err) {
//       if (err.code === "ENOENT") {
//         // Page not found
//         fs.readFile(
//           path.join(__dirname, "public", "404.html"),
//           (err, content) => {
//             if (err) throw err;
//             res.writeHead(200, { "Content-Type": "text/html" });
//             res.end(content);
//           }
//         );
//       } else {
//         // Server error
//         res.writeHead(500);
//         res.end(`Server Error: ${err.code}: ${err.message}`);
//       }
//     } else {
//       // Success
//       res.writeHead(200, { "Content-Type": contentType });
//       res.end(content, "utf8");
//     }
//   });
// });

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
