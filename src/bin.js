#!/usr/bin/env node
// TDOO: yargs can have email, pssw, molecule, ...
const roleInquirer = require('.')

;(async function () {
  const { credentials, roles, role } = await roleInquirer()
  console.log('Selected Role:\n' + JSON.stringify(role, 0, 2))
})()
