var fs = require('fs');
var path = require('path');
var os = require('os');
var shell = require('shelljs');

var y2j  = require('json2yaml');
var chalk = require('chalk');

var projRoot = process.env.PWD;

var cfgPath = path.join(projRoot, 'build/docker/docker-compose.json');
var dcPath = path.join(projRoot, 'docker-compose.yml');

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

if (os.platform() === 'linux') {
  plexConfigDir = path.join(projRoot, 'configs/plex');
  transcodeConfigDir = path.join(projRoot, 'temp/plex');

  dcObj.plex.volumes.push('./configs/plex:/config');

  shell.mkdir('-p', plexConfigDir); // Create config if it doesn't exist
  shell.exec('chown 797:797 -R ' + plexConfigDir); // Set it's ownership to the internal Docker containter's "plex" user

  shell.mkdir('-p', transcodeConfigDir); // Create temp if it doesn't exist
  shell.exec('chown 797:797 -R ' + transcodeConfigDir); // Set it's ownership to the internal Docker containter's "plex" user
}

console.log('Adding extra_hosts for ums dns name...');
hostSvcs = [
  'sickbeard',
  'couchpotato',
  'couchpotatoprerelease',
  'nginx',
  'sabnzbd',
  'transmission'
];
hostSvcs.forEach(function(s) {
  if (!dcObj[s]['extra_hosts']) {
    dcObj[s]['extra_hosts'] = [];
  }

  dcObj[s]['extra_hosts'].push(dockerAddress + ':' + umsName);
});

if (!pia.user && !pia.password) {
  delete dcObj.transmission;
  delete dcObj.nginx;
}

console.log('Converting to yaml...');
var yamlStr = y2j.stringify(dcObj);

console.log('Writing to ' + dcPath + '...');
fs.writeFileSync(dcPath, yamlStr);
console.log(chalk.green('Successfully generated docker-compose.yml'));
