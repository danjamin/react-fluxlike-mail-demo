import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import MailboxesView from '../views/MailboxesView.js';

export default React.createClass({
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
