# What

Allows the user to select interactively one of its NetSuite roles using the command line. 

It supports both a command line application and a node.js API so other programs can re-use it (like developer tools)

# Install and use the command line interface

```sh
$ sudo npm install -g netsuite-role-inquirer
$ netsuite-role-inquirer
```

# Usage its node.js API

```sh
$ npm install netsuite-role-inquirer
```

Let's assume that in your project's developer tools, at some point you want to inquire the user to select one of its roles interactively by asking mail, password and then roles:

```javascript
const roleInquirer = require('netsuite-role-inquirer')
const {credentials, roles, role} = await roleInquirer()
```

Where `role` will be the role selected by the user, `roles` all the user's roles and `credentials` user mail, password, etc

Another case: we want to let our user to select one of its roles, given a known email and password and molecule "sandbox": 

```javascript
const {credentials, roles, role} = await roleInquirer({
    email: 'known@email.com', 
    password: 'se$cret', 
    molecule: 'sandbox',
})
```

In this case the user won't be asked by its email and password, just to select a role using the given NetSuite molecule (sandbox).