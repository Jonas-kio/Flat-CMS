// minimal Express server stub to keep project running with empty output
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

// health check / root returns empty page
app.get('/', (req, res) => {
  res.send('');
});

app.listen(PORT, () => {
  console.log(`backend running on port ${PORT}`);
});
