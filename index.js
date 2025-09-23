const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
require("./dbconfig")
const path = require('path');
const http = require("http");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/", require('./app'))
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
});


app.get('/', (req, res) => {
    res.send("Welcome to Backend");
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });