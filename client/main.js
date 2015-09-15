var React = require("react/addons");
var _ = require("lodash");
var ItemsTemplate = require("./items_template.rt");
var Reflux = require("reflux");

var actions = Reflux.createActions(["createItem", "secondElapsed"]);

var TodoItemStore = Reflux.createStore({
  listenables: actions,

  init: function() {
    this.state = {
      todoItems: ["Item 1", "Item 2"],
      tick: 1
    };
  },

  onCreateItem: function(itemText) {
    this.state.todoItems.push(itemText);
    this.trigger("itemAdded", this.state);
  },

  onSecondElapsed: function() {
    this.state.tick += 1;
    this.trigger("secondElapsed", this.state);
  }
});

var ToDoList = React.createClass({
  render: ItemsTemplate,

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return TodoItemStore.state;
  },

  storeUpdated: function(event, state) {
    this.setState(state);
    if (event === "secondElapsed") {
      console.log(state.tick);
    }
  },

  componentDidMount: function() {
    this.listenTo(TodoItemStore, this.storeUpdated);
    window.setInterval(actions.secondElapsed, 1000);
  },

  buttonClicked: function() {
    actions.createItem(window.prompt("item?"));
  }
});

global.startChatClient = function(container) {
  React.render(React.createElement(ToDoList), container);
};

global.renderChatClient = function(items) {
  return React.renderToString(React.createElement(ToDoList, {todoItems: items}));
};
