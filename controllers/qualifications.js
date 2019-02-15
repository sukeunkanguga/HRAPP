const qualifications = require('../db_apis/qualifications.js');
 
async function get(req, res, next) {
  try {
    const context = {};
 
    context.id = parseInt(req.params.id, 10);
 
    const rows = await qualifications.find(context);
 
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

function getQualificationFromRec(req) {

  const qualification = {
  	pkid: req.body.pkid,
  	usrid: req.body.usrid,
    staffid: req.body.staffid,
    institution: req.body.institution,
    certification: req.body.certification,
    begin_date: req.body.begin_date,
    end_date: req.body.end_date
  };

  return qualification;
}

async function post(req, res, next) {
  try {
    let qualification = getQualificationFromRec(req);

    qualification = await qualification.create(qualification);

    res.status(201).json(qualification);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;



async function put(req, res, next) {
  try {
    let qualification = getQualificationFromRec(req);

    qualification.pkid = parseInt(req.params.id, 10);

    qualification = await qualifications.update(qualification);

    if (qualification !== null) {
      res.status(200).json(qualification);
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

    const success = await qualifications.delete(id);

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