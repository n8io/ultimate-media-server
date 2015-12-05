# ultimate-media-server
A collection of services that stands up all your media automation needs with docker containers.

## What's in the box???
* [Sabnzbd](http://sabnzbd.org)
* [Sickbeard](http://sickbeard.com)
* [CouchPotato](https://couchpota.to)
* [Plex Media Server (plexpass)](https://plex.tv)

## How easy it?

### Prequisites
* Install [Docker (toolbox)](https://www.docker.com/toolbox)
* Start the _default_ machine:
  * `docker-machine start default`
* Register environment variables
  * `eval $(docker-machine env default)`

### To setup
* `npm install`

### To start
* `npm run docker`
* *** NOTE *** this will take a few minutes depending on your broadband speed on inital startup. Starts instantly thereafter.

### To open all services in browser
* `npm run open`
* *** NOTE *** wait a few seconds after `npm run docker` completes successfully

### To stop
* `npm run docker:stop`

Once the install finishes your browser will automatically open up the following pages:

* [http://ultimate.media.server:8080](http://ultimate.media.server:8080) // Sabnzbd
* [http://ultimate.media.server:8081](http://ultimate.media.server:8081) // Sickbeard
* [http://ultimate.media.server:5050](http://ultimate.media.server:5050) // CouchPotato
* [http://ultimate.media.server:5050](http://ultimate.media.server:5051) // CouchPotato (for prereleases)
* [http://ultimate.media.server:32400/web](http://ultimate.media.server:32400/web) // Plex Media Server

