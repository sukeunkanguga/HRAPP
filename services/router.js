const express = require('express');
const path = require("path");
const router = new express.Router();
const employees = require('../controllers/employees.js');
const qualifications = require('../controllers/qualifications.js');
const leaves = require('../controllers/leaves.js');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.route('/employees/:id?')
  .get(employees.get)
  .post(employees.post)
  .put(employees.put);
  //.delete(employees.delete);

router.route('/qualifications/:id?')
.get(qualifications.get)
.post(qualifications.post)
.put(qualifications.put);

router.route('/leaves/:id?')
.get(leaves.get)
.post(leaves.post)
.put(leaves.put);

module.exports = router;