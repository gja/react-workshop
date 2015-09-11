var React = require("react");

var ChatClient = React.createClass({
  render: function() {
    return <div>Hello, React</div>;
  }
});

global.startChatClient = function(container) {
  React.render(React.createElement(ChatClient), container);
};
