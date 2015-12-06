var open = require('open');

var basePath = 'http://ultimate.media.server';
var appPaths = [
  ':8080',
  ':8081',
  ':5050',
  ':5051',
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
