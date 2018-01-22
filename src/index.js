const inquirer = require('inquirer')
const request = require('request')
const { getRoles, selectRole } = require('./roles')

//TODO : try / catch

/**
 * main interactive tool. By default will ask the user for email, password and to select one role from all. If email, password are given in config it will skip the corresponding step. 
 * @param {NetSuiteRoleInquirerConfig} config 
 * @memberof NetSuiteRoleInquirer
 */
async function main (config = {}) {

  let email = config.email || await inquirer.prompt([
    {
      type: 'email',
      name: 'email',
      message: 'Email'
    }
  ])
  let password = config.password || await inquirer.prompt([
    {
      type: 'password',
      name: 'password',
      message: 'Password'
    }
  ])

  const credentials = Object.assign({}, config, email, password)

  const roles = config.roles || await getRoles(credentials)

  const role = await selectRole({ roles })

  return Promise.resolve({credentials, roles, role: role.role})
}

/**
 * The main object returned when you require('netsuite-role-inquirer')
 * @class
 * @hideconstructor
 */
class NetSuiteRoleInquirer {
}

/**
 * @typedef {Object} NetSuiteRoleInquirerConfig
 * @property {String} email
 * @property {String} password
 * @property {String} molecule
 * @property {String} vm
 */



module.exports = {main, getRoles}
