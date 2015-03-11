

var Friend = React.createClass({displayName: "Friend",
  render: function() {
    return (
      React.createElement("div", {className: "friend"}, 
         "this.props.name"
      )
    );
  }
});

var Friends = React.createClass({displayName: "Friends",
  loadFriendsFromServer: function(){
    debugger
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data : data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.proprs.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {

    var friendNodes = this.state.data.map(function(friend, index){
      return(
        React.createElement(Friend, {name: friend.name, key: index})
      )
    });
    return (
      React.createElement("div", {className: "friends"}, 
        friendNodes
      )
    );
  }
});




React.render(
  React.createElement(Friends, {url: "friends.json"}),
  document.getElementById('uiContainer')
);
