const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const branches = [
  { id: 1, name: 'Branch 1' },
  { id: 2, name: 'Branch 2' },
];

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/about', (req, res) => {
  res.json({ center: 'Educational Center', status: 'learning Express' });
});

app.get('/branches/:id', (req, res) => {
  const id = Number(req.params.id);
  const branch = branches.find((b) => b.id === id);

  if (!branch) {
    return res.status(404).json({ error: 'Branch not found' });
  }

  res.json(branch);
});

app.post('/branches', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }

  const newBranch = { id: branches.length + 1, name };
  branches.push(newBranch);

  res.status(201).json(newBranch);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



