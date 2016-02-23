var fs = require('fs');
var cwd = require('cwd');
var os = require('os');
var shell = require('shelljs');

var y2j  = require('json2yaml');
var chalk = require('chalk');

var projRoot = process.env.PWD;

var cfgPath = cwd('build/docker/docker-compose.json');
var dcPath = cwd('docker-compose.yml');

var regDA = /(:[\d]+)|(tcp:\/\/)/ig;
var umsName = 'ultimate.media.server';
var dockerAddress = (process.env.DOCKER_HOST || '').replace(regDA, '') || umsName;

var fileContents;
var dcObj;
var plexConfigDir;
var transcodeConfigDir;
var hostSvcs;
var pia = {
	user: process.env.PIA_USER || '',
	password: process.env.PIA_PASS || ''
};

console.log('Loading docker-compose.json...');
fileContents = fs.readFileSync(cfgPath, 'utf-8').toString();

console.log('Parsing contents...');
dcObj = JSON.parse(fileContents);

if (os.platform() !== 'linux') {
  console.log(chalk.yellow('  WARNING: The current operating system\'s version of Docker does not support Plex Media Server. It will not be installed.'));

  delete dcObj.plex;
}

console.log('Adding extra_hosts for ums dns name...');

if (!pia.user && !pia.password) {
  delete dcObj.transmission;
  delete dcObj.nginx;
}

console.log('Converting to yaml...');
var yamlStr = y2j.stringify(dcObj);

console.log('Writing to ' + dcPath + '...');
fs.writeFileSync(dcPath, yamlStr);
console.log(chalk.green('Successfully generated docker-compose.yml'));
