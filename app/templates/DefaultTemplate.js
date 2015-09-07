import React from 'react';
import classNames from 'classnames';

import MailboxesView from '../views/MailboxesView.js';

export default React.createClass({
  displayName: 'DefaultTemplate',

  propTypes: {
    showSidePanel: React.PropTypes.bool.isRequired,
    ContentView: React.PropTypes.element.isRequired
  },

  render: function () {
    var asideClasses = classNames({
      'hidden': this.props.showSidePanel === false
    });

    return (
      <section className='main hbox'>
        <aside className={asideClasses}><MailboxesView /></aside>
        <article>{this.props.ContentView}</article>
      </section>
    );
  }
});
