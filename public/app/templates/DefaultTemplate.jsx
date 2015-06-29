define(function (require) {
  'use strict';

  var React = require('react'),
    ReactBootstrap = require('react-bootstrap'),
    MailboxesView = require('jsx!app/views/MailboxesView');

  var Grid = ReactBootstrap.Grid,
    Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col;

  return React.createClass({
    displayName: 'DefaultTemplate',

    propTypes: {
      showSidePanel: React.PropTypes.bool.isRequired,
      ContentView: React.PropTypes.element.isRequired
    },

    render: function () {
      var sidePanel;

      if (this.props.showSidePanel) {
        sidePanel = (
          <Col md={2}>
            <MailboxesView />
          </Col>
        );
      }

      return (
        <main className='clearfix'>
          <Grid>
            <Row>
              {sidePanel}
              <Col md={sidePanel ? 10 : 12}>
                {this.props.ContentView}
              </Col>
            </Row>
          </Grid>
        </main>
      );
    }
  });
});
