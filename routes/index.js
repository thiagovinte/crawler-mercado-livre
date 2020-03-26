'use strict';

const express = require('express');

const router = express.Router();

// Importação das demais rotas
router.use('/crawler', require('./crawlerRoutes'));
module.exports = router;