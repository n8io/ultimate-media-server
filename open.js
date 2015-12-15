var open = require('open');
var reg = /(:[\d]+)|(tcp:\/\/)/ig;
var address = (process.env.DOCKER_HOST || '').replace(reg, '') || 'ultimate.media.server';


var basePath = 'http://' + address;
var appPaths = [
  ':8080',
  ':8081',
  ':5050',
  ':5051',
  ':8091',
  ':32400/web'
];

if(!!process.env.NO_OPEN) {
  console.log('NO_OPEN flag present, skipping auto-open');
  return;
}

for(var i = appPaths.length - 1; i >= 0; i--) {
  open([
      basePath,
      appPaths[i]
    ].join('')
  );
}
