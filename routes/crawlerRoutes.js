'use strict';

const express = require('express');
const controllers = require('../controllers');
const crawlerController = require('../controllers/crawlerController');

const router = express.Router();

router.post('/list', async (req, res) => {
    controllers.execute(req, res, await crawlerController.list);
});

module.exports = router;