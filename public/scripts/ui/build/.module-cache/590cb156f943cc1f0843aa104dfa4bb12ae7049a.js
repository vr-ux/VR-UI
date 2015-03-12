(function UI(){
  var Friend = React.createClass({displayName: "Friend",
    teleportToFriend: function(){
      console.log('teleport!!!')
    },
    highlightFriend: function(){
      World.friends.highlight(this.props.id);
    },
    unHighlightFriend: function(){
      World.friends.unHighlight(this.props.id);
    },
    render: function() {
      return (
        React.createElement("div", {className: "friend", onClick: this.teleportToFriend, onMouseOver: this.highlightFriend, onMouseUp: this.unHighlightFriend}, 
           this.props.name
        )
      );
    }
  });

  var FriendList = React.createClass({displayName: "FriendList",
    loadFriendsFromServer: function(){
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
          this.setState({data : data});

        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.ps.url, status, err.toString());
        }.bind(this)
      });
    },

    getInitialState: function(){
      return {data:[]};
    },

    componentDidMount: function(){
      this.loadFriendsFromServer();
    },
    render: function() {
      var friendNodes = this.state.data.map(function(friend, index){
        World.friends.place(friend.position, friend.id);
        return (
          React.createElement(Friend, {name: friend.name, id: friend.id, key: index})
        );
      });
      return (
        React.createElement("div", {className: "friendList"}, 
          friendNodes
        )
      );
    }
  });

  React.render(
    React.createElement(FriendList, {url: "friends.json"}),
    document.getElementById('uiContainer')
  );
})();