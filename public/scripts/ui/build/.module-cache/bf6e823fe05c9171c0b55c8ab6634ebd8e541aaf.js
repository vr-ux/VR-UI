

var Friend = React.createClass({displayName: "Friend",
  render: function() {
    return (
      React.createElement("div", {className: "friend"}, 
         "this.props.name"
      )
    );
  }
});

var FriendPanel = React.createClass({displayName: "FriendPanel",
  loadFriendsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data : data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInititalState: function(){
    return {data:[]};
  },

  componentDidMount: function(){
    this.loadFriendsFromServer();
  },
  render: function() {
    return (
      React.createElement("div", {className: "friend_panel"}, 
        "Friends"
      )
    );
  }
});




React.render(
  React.createElement(FriendPanel, {url: "friends.json"}),
  document.getElementById('uiContainer')
);
