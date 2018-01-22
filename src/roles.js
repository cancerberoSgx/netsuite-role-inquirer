const inquirer = require('inquirer')
const request = require('request')

/**
 * return a promise resolved with all the roles found for given email&password and possibly molecule. config.email and config.password are mandatory here
 * @param {NetSuiteRoleInquirerConfig} config 
 * @memberof NetSuiteRoleInquirer
 */
function getRoles (credentials) {
  return new Promise((resolve, reject) => {
    let requestUrl
    const headers = {
      Accept: '*/*',
      'Accept-Language': 'en-us',
      Authorization:
        'NLAuth nlauth_email=' +
        credentials.email +
        ', nlauth_signature=' +
        encodeURIComponent(credentials.password)
    }

    if (credentials.molecule) {
      requestUrl =
        'https://rest.' + credentials.molecule + '.netsuite.com/rest/roles'
    } else if (credentials.vm) {
      requestUrl = credentials.vm + '/rest/roles'
    } else {
      requestUrl = 'https://rest.netsuite.com/rest/roles'
    }

    request.get(
      requestUrl,
      {
        headers: headers,
        rejectUnauthorized: false
      },
      function (err, request, response_body) {
        if (err) {
          deferred.reject(err)
        } else {
          var response = JSON.parse(response_body)
          if (response.error) {
            reject(response.error)
          } else {
            resolve(response)
          }
        }
      }
    )
  })
}


function selectRole (credentials) {
  const choices = credentials.roles.map(r => {
    return {
      name: r.role.name + ' @ ' + r.account.name,
      value: r
    }
  })
  return inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: 'Select a role',
      choices: choices
    }
  ])
}

module.exports = { getRoles, selectRole }
