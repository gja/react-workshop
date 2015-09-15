var React = require("react/addons");

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

module.exports = TodoItem;
