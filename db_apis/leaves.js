const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery = 
 `select pkid "pkid",
 	usrid "user",
 	staffid "id",
    leave_type "leave_type",
    days_left "days_left",
    begin_date "begin_date",
    end_date "end_date"
  from leaves`;

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
`INSERT INTO leaves (
	pkid,
 	usrid,
    staffid,
    leave_type,
    days_left,
    begin_date,
    end_date
  ) values (
  	:pkid,
  	:usrid
  	:staffid,
    :leave_type,
    :days_left,
    :begin_date,
    :end_date
    )
  returning staffid
  into :staffid`;


async function create(emp) {
  const leave = Object.assign({}, emp);

  leave.staffid = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, leave);

  leave.pkid = result.outBinds.pkid[0];

  return leave;
}

module.exports.create = create;



const updateSql =
 `update leave
  set staffid = :staffid,
    leave_type = :leave_type,
    days_left = :days_left,
    begin_date = :begin_date,
    end_date = :end_date
  where pkid = :pkid`;

async function update(emp) {
  const leave = Object.assign({}, emp);
  const result = await database.simpleExecute(updateSql, leave);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return leave;
  } else {
    return null;
  }
}

module.exports.update = update;

