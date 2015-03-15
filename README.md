# react-fluxlike-mail-demo

demo application of a very basic email client using fluxlike architecture, react, and webpack

# Pre-reqs

Install [nodejs](https://nodejs.org/)

# Running

Install dependencies, build and watch for changes:

```sh
$ npm install
$ npm start
```

In a separate tab serve the web app:
```sh
$ npm run-script serve
```

# Linting

```sh
$ npm run-script lint
```

# TODO

- [x] Bring in immutability
- [x] Reduce the number of re-renders
- [ ] Action handlers
- [ ] Demonstrate testing with mockrequire and an example unit test
- [ ] Is there a lighter router to use than to include all of Backbone?
- [ ] Explore a link-to component which interacts with the router
- [ ] Be smarter about which data to fetch in "nested routes"
- [ ] Pre-load from local storage (when available)
- [ ] Pull out re-usable libraries
