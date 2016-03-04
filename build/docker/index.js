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
else if (transmission.user && transmission.password) {
  dcObj.transmission.environment.push('TRANSMISSION_RPC_USERNAME=${TRANSMISSION_USER}');
  dcObj.transmission.environment.push('TRANSMISSION_RPC_PASSWORD=${TRANSMISSION_PASS}');
  dcObj.transmission.environment.push('TRANSMISSION_RPC_AUTHENTICATION_REQUIRED=true');
}
else {
  console.log(chalk.yellow(`Transmission credentials not provided. Transmission auth disabled.`));
}

console.log('Converting to yaml...');
const yamlStr = y2j.stringify(dcObj);

console.log('Writing to ' + dcPath + '...');
fs.writeFileSync(dcPath, yamlStr);
console.log(chalk.green('Successfully generated docker-compose.yml'));
