const fs = require('fs');
const cwd = require('cwd');

const y2j  = require('json2yaml');
const chalk = require('chalk');

const cfgPath = cwd('build/docker/docker-compose.json');
const dcPath = cwd('docker-compose.yml');
const dcObj = require(cfgPath);
const pia = {
  user: process.env.PIA_USER || '',
  password: process.env.PIA_PASS || ''
};
const transmission = {
  user: process.env.TRANSMISSION_USER || '',
  password: process.env.TRANSMISSION_PASS || ''
};

if (!pia.user && !pia.password) {
  console.log(chalk.yellow(`PIA credentials not provided. Will not build Transmission.`));

  delete dcObj.transmission;
  delete dcObj.nginx;

  dcObj.sonarr.links = dcObj.sonarr.links.filter((link) => link !== 'transmission');
  dcObj.couchpotato.links = dcObj.couchpotato.links.filter((link) => link !== 'transmission');
  dcObj.couchpotatoprerelease.links = dcObj.couchpotatoprerelease.links.filter((link) => link !== 'transmission');
}
else if (transmission.user && transmission.pass) {
  console.log(chalk.yellow(`Transmission credentials not provided. Transmission auth disabled.`));

  dcObj.transmission.environment.TRANSMISSION_RPC_USERNAME = transmission.user;
  dcObj.transmission.environment.TRANSMISSION_RPC_PASSWORD = transmission.pass;
  dcObj.transmission.environment.TRANSMISSION_RPC_AUTHENTICATION_REQUIRED = true;
}

console.log('Converting to yaml...');
const yamlStr = y2j.stringify(dcObj);

console.log('Writing to ' + dcPath + '...');
fs.writeFileSync(dcPath, yamlStr);
console.log(chalk.green('Successfully generated docker-compose.yml'));
