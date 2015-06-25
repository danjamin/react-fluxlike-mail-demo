// Configure loading modules from the bower_components directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
  baseUrl: 'bower_components',

  paths: {
    app: '../app',

    backbone: 'backbone/backbone',
    immutable: 'immutable/dist/immutable',
    jquery: 'jquery/dist/jquery',
    react: 'react/react-with-addons',
    classnames: 'classnames/index',
    'react-bootstrap': 'react-bootstrap/react-bootstrap',
    rsvp: 'rsvp/rsvp',
    underscore: 'underscore/underscore',
    'fl-api-service': 'fl-api-service/dist/fl-api-service',
    'fl-store': 'fl-store/dist/fl-store',
    'fl-router': 'fl-router/dist/fl-router',

    // JSX loader plugin
    text: 'requirejs-text/text',
    jsx: 'jsx-requirejs-plugin/js/jsx',
    JSXTransformer: 'jsx-requirejs-plugin/js/JSXTransformer'
  },

  jsx: {
    fileExtension: '.jsx',
    harmony: false,
    stripTypes: false /*todo: true if using flow*/
  }
});

// bring in the app configuration
requirejs(['app/config']);
