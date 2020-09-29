# mSmart

This application is a prototype offering an overview console for industrial machinery sensors/status.
**mSmart** stands for Smart Maintenance

## The app

This is an Angular 8 web application. For the scope of the current project state, it is built on top of a mock API.

## How to start mSmart

The app is built as a Docker image. In order to build it, please run:

```
  docker build -t msmart .
```

After the app is built, you can start it with
```
  docker run -p 80:80 msmart
```

At this point, if you point a browser towards http://localhost, you should see the application's home page.

## How it's built

### Modules
The app is built on the concept of lazily loaded modules. This way, the application is very versatile, and only loads the modules that are needed at a time.

There are currently 2 modules: `main` and `status`. 

#### Main module
The `main` module is there just for setting up the frame.
It contains the root component, where the routing will happen (contains the _router-outlet_)
Additionaly, it could also be the host for the navigation.

Currently the app has no navigation.

The `services` folder houses a guard for authentication. The auth is not yet developed, so the guard simply returns true.

#### Status module
This module contains the status data & info.
The routes to it are protected by the existence of a logged in user.
There are 2 main page-components: 

* Dashboard - which contains a few views into the current machines' status
* Detailed view - which contains a detail on a machine

##### The Dashboard
The Dashboard makes use of the `Overview` component and the `Machine list` component.

The Overview contains a google maps integration, showing all machines on the world map. It also has an exhaustive list which updates on each event, through an observable.
In order for the google maps to work, an API key must be provided. This API key needs to be added to the status module. (`src/app/status/status.module.ts`)

The Machine list is a filtered list for a specific status of the machines. This is also updated by the same Observable.


##### The Detailed view
This is a much simpler view, which just shows the details about a machine, and a list of last known events.
This one also listens to the events observable, to update its last known events list.

In order to navigate to a machine's detailed view, one must click on any of the list items in any of the components.
