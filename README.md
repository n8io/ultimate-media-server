![Ultimate Media Server](ums.jpg)

# ultimate-media-server
A collection of services that stands up all your media automation needs with Docker containers.

## What's in the box?!
* <img src='http://www.google.com/s2/favicons?domain=sabnzbd.org' height='16' width='16' /> [Sabnzbd](http://sabnzbd.org) (nzb manager)
* <img src='http://www.google.com/s2/favicons?domain=sickbeard.com' height='16' width='16' /> [Sickbeard](http://sickbeard.com) (tv download manager)
* <img src='http://www.google.com/s2/favicons?domain=couchpota.to' height='16' width='16' /> [CouchPotato](https://couchpota.to) (movie download manager)
* <img src='http://www.google.com/s2/favicons?domain=transmissionbt.com' height='16' width='16' /> [Transmission](https://transmissionbt.com) (torrent download manager)
* <img src='http://www.google.com/s2/favicons?domain=plex.tv' height='16' width='16' /> [Plex Media Server (plexpass)](https://plex.tv) (media manager)

## Getting Started

### Prequisites
* You're on a *nix machine (preferably Ubuntu)
  * [Install Docker following these steps](https://docs.docker.com/linux/step_one/)
  * Make sure docker-compose is installed via:
    * `apt-get install docker-compose`
* All of your existing media should be moved to `./media`
  * Only directories underneath the project root can be accessed and shared via Docker.

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

Once the install finishes your browser will automatically open up the following pages:

* <img src='http://www.google.com/s2/favicons?domain=sabnzbd.org' height='16' width='16' /> [http://ultimate.media.server:8080](http://ultimate.media.server:8080) // Sabnzbd
* <img src='http://www.google.com/s2/favicons?domain=sickbeard.com' height='16' width='16' /> [http://ultimate.media.server:8081](http://ultimate.media.server:8081) // Sickbeard
* <img src='http://www.google.com/s2/favicons?domain=couchpota.to' height='16' width='16' /> [http://ultimate.media.server:5050](http://ultimate.media.server:5050) // CouchPotato
* <img src='http://www.google.com/s2/favicons?domain=couchpota.to' height='16' width='16' /> [http://ultimate.media.server:5051](http://ultimate.media.server:5051) // CouchPotato (for prereleases)
* <img src='http://www.google.com/s2/favicons?domain=plex.tv' height='16' width='16' /> [http://ultimate.media.server:32400/web](http://ultimate.media.server:32400/web) // Plex Media Server
* <img src='http://www.google.com/s2/favicons?domain=transmissionbt.com' height='16' width='16' /> [http://ultimate.media.server:8091](http://ultimate.media.server:8091) // Transmission

... OR if you are lazy
* `npm run open`

## Troubleshooting

### I don't see Transmission running?

* You need a valid [PrivateInternetAccess](https://privateinternetaccess.com) creds
  * This is needed to properly protect your IP
  * Pay for the service or you don't get transmission. Sorry :-(
* Then run
  * `PIA_USER=username PIA_PASS=password npm run docker`

### I don't see Plex running

* Plex Media Server is only supported on *nix OSes. Try running on Debian or Ubuntu.
