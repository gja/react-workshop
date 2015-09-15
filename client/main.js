var React = require("react");
var _ = require("lodash");

var TodoItem = React.createClass({
  getInitialState: function() {
    return {finished: false};
  },

  itemChecked: function(e) {
    var checked = e.target.checked;
    console.debug(checked, this.props.itemText);
    this.setState({finished: checked});
  },

  render: function() {
    return React.createElement("div", {className: "todo-item"},
      React.createElement("input", {type: "checkbox",
        onChange: this.itemChecked}),
      React.createElement("span",
        {className: this.state.finished ? "done" : ""},
        this.props.itemText));
  }
});

var ToDoList = React.createClass({
  getInitialState: function() {
    return {
      todoItems: ["Item 1", "Item 2"]
    };
  },

  todoItems: function() {
    return _.map(this.state.todoItems, function(itemText) {
      return React.createElement(TodoItem, {itemText: itemText})
    });
  },

  buttonClicked: function() {
    var newItems = this.state.todoItems.concat([window.prompt("item?")]);
    this.setState({todoItems: newItems});
  },

  render: function() {
    return React.createElement("div", {},
      React.createElement("div", {className: "todo-list"},
        this.todoItems()),
      React.createElement("button", {onClick: this.buttonClicked},
        "Add Item"));
  }
});

global.startChatClient = function(container) {
  React.render(React.createElement(ToDoList), container);
};
