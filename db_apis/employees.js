const oracledb = require('oracledb');
const database = require('../services/database.js');

const baseQuery = 
 `select pkid "pkid",
 	usrid "user",
 	staffid "id",
    first_name "first_name",
    last_name "last_name",
    other_names "other_names",
    gender "gender",
    birth_date "birth_date",
    email "email",
    phone "phone",
    address "address",
    nationality "nationality"
  from employees`;

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
`INSERT INTO employees (
	pkid,
 	staffid,
    first_name,
    last_name,
    other_names,
    gender,
    birth_date,
    email,
    phone,
    address,
    nationality
  ) values (
  	:pkid,
  	:staffid,
    :first_name,
    :last_name,
    :other_names,
    :gender,
    :birth_date,
    :email,
    :phone,
    :address,
    :nationality
    )
  returning staffid
  into :staffid`;


async function create(emp) {
  const employee = Object.assign({}, emp);

  employee.staffid = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, employee);

  employee.staffid = result.outBinds.staffid[0];

  return employee;
}

module.exports.create = create;



const updateSql =
 `update employees
  set first_name = :first_name,
    last_name = :last_name,
    other_names = :other_names,
    gender = :gender,
    birth_date = :birth_date,
    email = :email,
    phone = :phone,
    address = :address,
    nationality = :nationality,
  where staffid = :staffid`;

async function update(emp) {
  const employee = Object.assign({}, emp);
  const result = await database.simpleExecute(updateSql, employee);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return employee;
  } else {
    return null;
  }
}

module.exports.update = update;


// const deleteSql =
//  'begin

//     delete from job_history
//     where pkid = :pkid;

//     delete from employees
//     where pkid = :pkid;

//     :rowcount := sql%rowcount;

//   end;'

// async function del(id) {
//   const binds = {
//     pkid: id,
//     rowcount: {
//       dir: oracledb.BIND_OUT,
//       type: oracledb.NUMBER
//     }
//   }
//   const result = await database.simpleExecute(deleteSql, binds);

//   return result.outBinds.rowcount === 1;
// }

// module.exports.delete = del;