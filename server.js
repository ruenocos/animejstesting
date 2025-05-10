const express = require('express');
const path = require('path');
const app = express();
const PORT = 12000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Access the website at https://work-1-volvsjmjnsynzkoq.prod-runtime.all-hands.dev`);
});