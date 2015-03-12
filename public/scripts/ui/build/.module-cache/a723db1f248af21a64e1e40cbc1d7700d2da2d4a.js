(function UI(){
  var Friend = React.createClass({displayName: "Friend",
    teleportToFriend: function(){
      World.friends.teleport(this.props.id);
    },
    highlightFriend: function(){
      World.friends.highlight(this.props.id);
    },
    unHighlightFriend: function(){
      World.friends.unHighlight(this.props.id);
    },
    render: function() {
      return (
        React.createElement("div", {className: "friend", onClick: this.teleportToFriend, onMouseOver: this.highlightFriend, onMouseLeave: this.unHighlightFriend}, 
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
      return {
        data:[],
        visible: false
      };
    },

    componentDidMount: function(){
      key('space', this.toggleMenu);
      this.loadFriendsFromServer();
    },
    toggleMenu: function(){
      this.setState({visible : !this.state.visible});
    },
    render: function() {
      var friendNodes = this.state.data.map(function(friend, index){
        World.friends.place(friend.position, friend.id);
        return (
          React.createElement(Friend, {name: friend.name, id: friend.id, key: index})
        );
      });
      return (
        React.createElement("div", null, 
          React.createElement("h2", null, "Friends"), 
          React.createElement("div", null, "friends ", this.state.data.length), 
          React.createElement("div", {className: "friendList"}, 
            this.state.visible ? friendNodes : null
          )
        )
      );
    }
  });

  React.render(
    React.createElement(FriendList, {url: "friends.json"}),
    document.getElementById('uiContainer')
  );
})();