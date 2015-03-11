

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
         Hey
      </div>
    );
  }
});




React.render(
  <Comment/>,
  document.getElementById('uiContent')
);
