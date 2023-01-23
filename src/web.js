const express = require('express')
const app = express()
app.get("/", (req, res) => res.send("#alive"))

app.listen(process.env["port"] || 3001, () => console.log("Keeping bot alive"))

