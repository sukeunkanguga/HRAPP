const employees = require('../db_apis/employees.js');
 
async function get(req, res, next) {
  try {
    const context = {};
 
    context.id = parseInt(req.params.id, 10);
 
    const rows = await employees.find(context);
 
    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.get = get;

function getEmployeeFromRec(req) {

  const employee = {
  	pkid: req.body.pkid,
  	staffid: req.body.staffid,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    other_names: req.body.other_names,
    gender: req.body.gender,
    birth_date: req.body.birth_date,
    email: req.body.email,
    phone1: req.body.phone,
    phone2: req.body.mobile,
    address1: req.body.address,
    address2: req.body.address2,
    nationality: req.body.nationality,
    tin: req.body.tin,
    ssnit: req.body.ssnit,
    tier2: req.body.tier2
  };

  return employee;
}

async function post(req, res, next) {
  try {
    let employee = getEmployeeFromRec(req);

    employee = await employees.create(employee);

    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;



async function put(req, res, next) {
  try {
    let employee = getEmployeeFromRec(req);

    employee.pkid = parseInt(req.params.id, 10);

    employee = await employees.update(employee);

    if (employee !== null) {
      res.status(200).json(employee);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.put = put;


async function del(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);

    const success = await employees.delete(id);

    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.delete = del;