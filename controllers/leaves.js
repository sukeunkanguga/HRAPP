const leaves = require('../db_apis/leaves.js');
 
async function get(req, res, next) {
  try {
    const context = {};
 
    context.id = parseInt(req.params.id, 10);
 
    const rows = await leaves.find(context);
 
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

function getLeaveFromRec(req) {

  const leave = {
  	pkid: req.body.pkid,
  	usrid: req.body.usrid,
    staffid: req.body.staffid,
    institution: req.body.leave_type,
    certification: req.body.days_left,
    begin_date: req.body.begin_date,
    end_date: req.body.end_date
  };

  return leaves;
}

async function post(req, res, next) {
  try {
    let leaves = getLeaveFromRec(req);

    leave = await leave.create(leave);

    res.status(201).json(leave);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;



async function put(req, res, next) {
  try {
    let leave = getLeaveFromRec(req);

    leave.pkid = parseInt(req.params.id, 10);

    leave = await leaves.update(leave);

    if (leave !== null) {
      res.status(200).json(leave);
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

    const success = await leave.delete(id);

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