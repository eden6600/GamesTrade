const express = require('express');

const router = express.Router();

// /api/test
router.get('/option', (req, res) => {
  res.send('test works');
});

module.exports = router;
