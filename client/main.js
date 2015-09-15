var React = require("react/addons");
var _ = require("lodash");
var ItemsTemplate = require("./items_template.rt");

var ToDoList = React.createClass({
  getInitialState: function() {
    return {
      todoItems: ["Item 1", "Item 2"]
    };
  },

  render: ItemsTemplate,

  buttonClicked: function() {
    var newItems = [window.prompt("item?")];
    var newState = React.addons.update(this.state, {
      todoItems: {$push: newItems}
    });
    this.setState(newState);
  },

  swapItems: function() {
    var newItems = [this.state.todoItems[1], this.state.todoItems[0]];
    this.state.todoItems = newItems;
    this.setState({todoItems: newItems});
  }
});

global.startChatClient = function(container) {
  React.render(React.createElement(ToDoList), container);
};
