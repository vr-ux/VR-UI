

var Friend = React.createClass({displayName: "Friend",
  render: function() {
    return (
      React.createElement("div", {className: "friend"}, 
         "Hey"
      )
    );
  }
});




React.render(
  React.createElement(Friend, null),
  document.getElementById('uiContainer')
);
