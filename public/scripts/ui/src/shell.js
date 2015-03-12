(function UI(){
  var Friend = React.createClass({
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
        <li className="friend" onClick ={this.teleportToFriend} onMouseOver={this.highlightFriend} onMouseLeave={this.unHighlightFriend}>
           {this.props.name}
        </li>
      );
    }
  });

  var FriendList = React.createClass({
    render: function(){
      return(
        <div className = "friendListContainer">
          <ul className = "friendList">{this.props.friends}</ul>
        </div>
      );
    }
  })

  var FriendPanel = React.createClass({
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
      setInterval(this.loadFriendsFromServer, this.props.pollInterval)
    },
    toggleMenu: function(){
      this.setState({visible : !this.state.visible});
    },
    render: function() {
      var friendNodes = this.state.data.map(function(friend, index){
        World.friends.place(friend.position, friend.id);
        return (
          <Friend name = {friend.name} id = {friend.id} key={index}/>
        );
      });
      return (
        <div className = "friendPanel">
          <h2 className = "friendHeader" onClick = {this.toggleMenu}>
            Friends 
            <span> { this.state.data.length} online</span>
          </h2>
          {this.state.visible ? <FriendList friends ={friendNodes}/> : null}
        </div>
      );
    }
  });

  React.render(
    <FriendPanel url= "friends.json" pollInterval = {2000}/>,
    document.getElementById('uiContainer')
  );
})();