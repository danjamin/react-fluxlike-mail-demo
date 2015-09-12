import React from 'react';
import classNames from 'classnames';

import MailboxesView from '../views/MailboxesView.js';
import DocumentTitleView from '../views/DocumentTitleView.js';
import HeaderView from '../views/HeaderView.js';

export default React.createClass({
  displayName: 'DefaultTemplate',

  propTypes: {
    showSidePanel: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      showSidePanel: true
    };
  },

  render: function () {
    var asideClasses = classNames({
      'hidden': this.props.showSidePanel === false
    });

    return (
      <main className='viewport vbox'>
        <header>
          <HeaderView />
        </header>

        <section className='main hbox'>
          <aside className={asideClasses}><MailboxesView /></aside>
          <article>{this.props.children}</article>
        </section>

        <DocumentTitleView />
      </main>
    );
  }
});
