

var Comment = React.createClass({displayName: "Comment",
  render: function() {
    return (
      React.createElement("div", {className: "comment"}, 
         "Hey"
      )
    );
  }
});




React.render(
  React.createElement(Comment, null),
  document.getElementById('uiContainer')
);
