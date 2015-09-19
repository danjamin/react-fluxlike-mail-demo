var React = require('react');
var classNames = require('classnames');

var MailboxesView = require('../views/MailboxesView.js');
var DocumentTitleView = require('../views/DocumentTitleView.js');
var HeaderView = require('../views/HeaderView.js');

module.exports = React.createClass({
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
