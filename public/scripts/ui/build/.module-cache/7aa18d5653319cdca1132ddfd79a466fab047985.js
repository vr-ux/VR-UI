

var Comment = React.createClass({displayName: "Comment",
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      React.createElement("div", {className: "comment"}, 
        React.createElement("h2", {className: "commentAuthor"}, 
          "Hey"
        )
      )
    );
  }
});




React.render(
  React.createElement(Comment, null),
  document.getElementById('uiContent')
);
