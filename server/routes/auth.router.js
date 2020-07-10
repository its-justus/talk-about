const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/google', passport.authenticate('google', {scope: ['email']}));
router.get('/google/callback',
	passport.authenticate('google', {failureRedirect: `${process.env.WEBAPP_ROOT_URL}/#/home`}),
	(req, res) => res.redirect(process.env.WEBAPP_ROOT_URL));
