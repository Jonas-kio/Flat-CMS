const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const SETTINGS_PATH = path.join(__dirname, '../content/settings/site.json');

router.get('/', (req, res) => {
  if (!fs.existsSync(SETTINGS_PATH)) return res.json({});
  res.json(JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf-8')));
});

router.put('/', (req, res) => {
  const current = fs.existsSync(SETTINGS_PATH)
    ? JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf-8'))
    : {};
  const updated = { ...current, ...req.body };
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(updated, null, 2));
  res.json(updated);
});

module.exports = router;
