const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(express.json());
app.use(cors());

let commands = [];
let idCounter = 1;

app.get("/commands", (req, res) => {
  res.json(commands);
});

app.post("/commands", (req, res) => {
  const { name, command, description } = req.body;
  const newCommand = { id: idCounter++, name, command, description, output: "" };
  commands.push(newCommand);
  res.status(201).json(newCommand);
});

app.delete("/commands/:id", (req, res) => {
  const { id } = req.params;
  commands = commands.filter((cmd) => cmd.id !== parseInt(id));
  res.sendStatus(204);
});

app.post("/execute/:id", (req, res) => {
  const { id } = req.params;
  const cmd = commands.find((c) => c.id === parseInt(id));
  
  if (!cmd) return res.status(404).json({ error: "Command not found" });

  exec(cmd.command, (error, stdout, stderr) => {
    cmd.output = error ? stderr : stdout;
    res.json({ output: cmd.output });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
