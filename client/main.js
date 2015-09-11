var React = require("react");

var ChatClient = React.createClass({
  render: function() {
    return React.createElement("div", {}, "This is awesome!");
  }
});

global.startChatClient = function(container) {
  React.render(React.createElement(ChatClient), container);
};
