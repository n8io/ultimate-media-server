# ultimate-media-server
A collection of services that stands up all your media automation needs with docker containers.

## What's in the box???
* [Sabnzbd](http://sabnzbd.org)
* [Sickbeard](http://sickbeard.com)
* [CouchPotato](https://couchpota.to)
* [Plex Media Server (plexpass)](https://plex.tv)

## How easy it?

### Prequisites
* All of your media exists in `./media` (restriction of docker)
* You're on a *nix machine (preferably Ubuntu)
  * [Install Docker following these steps](https://docs.docker.com/linux/step_one/) or [these steps](https://docs.docker.com/linux/step_one/)
  * Make sure docker-compose is installed via:
    * `apt-get install docker-compose`

### To setup
* `npm install`
* `npm run hosts`

### To start
* `npm run docker`
* *** PLEASE NOTE *** 
  * This will take a few minutes depending on your broadband speed on inital startup. 
  * Starts almost instantly thereafter.

### To stop
* `npm run docker:stop`

### Want Transmission?

* You need a valid [PrivateInternetAccess](https://privateinternetaccess.com) creds then...
* `PIA_USER=username PIA_PASS=password npm run docker`

Once the install finishes your browser will automatically open up the following pages:

* [http://ultimate.media.server:8080](http://ultimate.media.server:8080) // Sabnzbd
* [http://ultimate.media.server:8081](http://ultimate.media.server:8081) // Sickbeard
* [http://ultimate.media.server:5050](http://ultimate.media.server:5050) // CouchPotato
* [http://ultimate.media.server:5051](http://ultimate.media.server:5051) // CouchPotato (for prereleases)
* [http://ultimate.media.server:32400/web](http://ultimate.media.server:32400/web) // Plex Media Server
* [http://ultimate.media.server:8091](http://ultimate.media.server:8091) // Transmission

... OR if you are lazy
* `npm run open`
