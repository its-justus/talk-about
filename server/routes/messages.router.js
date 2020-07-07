const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET /api/messages
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log("ROUTE: GET /api/messages");
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;