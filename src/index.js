const inquirer = require('inquirer')
const request = require('request')
const { getRoles, selectRole } = require('./roles')

//TODO : try / catch

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

  return Promise.resolve({credentials, roles, role})
}

module.exports = main
