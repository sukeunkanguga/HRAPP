const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery = 
 `select pkid "pkid",
 	usrid "user",
 	staffid "id",
    institution "institution",
    certification "certification",
    begin_date "begin_date",
    end_date "end_date"
  from qualifications`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.staffid = context.id;

    query += `\nwhere staffid = :staffid`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const createSql =
`INSERT INTO qualifications (
	pkid,
 	usrid,
    staffid,
    institution,
    certification,
    begin_date,
    end_date
  ) values (
  	:pkid,
  	:usrid
  	:staffid,
    :institution,
    :certification,
    :begin_date,
    :end_date
    )
  returning staffid
  into :staffid`;


async function create(emp) {
  const qualification = Object.assign({}, emp);

  qualification.staffid = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, qualification);

  qualification.pkid = result.outBinds.pkid[0];

  return qualification;
}

module.exports.create = create;



const updateSql =
 `update qualifications
  set staffid = :staffid,
    institution = :institution,
    certification = :certification,
    begin_date = :begin_date,
    end_date = :end_date
  where pkid = :pkid`;

async function update(emp) {
  const qualification = Object.assign({}, emp);
  const result = await database.simpleExecute(updateSql, qualification);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return qualification;
  } else {
    return null;
  }
}

module.exports.update = update;

