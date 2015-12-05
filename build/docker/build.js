var fs = require('fs');
var path = require('path');
var os = require('os');
var shell = require('shelljs');

var y2j  = require('json2yaml');
var chalk = require('chalk');

var projRoot = process.env.PWD;

var cfgPath = path.join(projRoot, 'build/docker/docker-compose.json');
var dcPath = path.join(projRoot, 'docker-compose.yml');

console.log('Loading ' + cfgPath + ' ...');
var fileContents = fs.readFileSync(cfgPath, 'utf-8').toString();

console.log('...loaded');
console.log('Parsing contents ...');
var dcObj = JSON.parse(fileContents);

if (os.platform() === 'linux') {
  var plexConfigDir = path.join(projRoot, 'configs/plex');
  var transcodeConfigDir = path.join(projRoot, 'temp/plex');

  dcObj.plex.volumes.push('./configs/plex:/config');

  shell.mkdir('-p', plexConfigDir); // Create config if it doesn't exist
  shell.exec('chown 797:797 -R ' + plexConfigDir); // Set it's ownership to the internal Docker containter's "plex" user

  shell.mkdir('-p', transcodeConfigDir); // Create temp if it doesn't exist
  shell.exec('chown 797:797 -R ' + transcodeConfigDir); // Set it's ownership to the internal Docker containter's "plex" user
}

console.log('Converting to yaml ...');
var yamlStr = y2j.stringify(dcObj);

console.log('Writing to ' + dcPath + ' ...');
fs.writeFileSync(dcPath, yamlStr);
console.log(chalk.green('Successfully generated docker-compose.yml'));
