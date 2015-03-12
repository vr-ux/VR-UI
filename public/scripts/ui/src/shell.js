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
        <div className="friend" onClick ={this.teleportToFriend} onMouseOver={this.highlightFriend} onMouseLeave={this.unHighlightFriend}>
           {this.props.name}
        </div>
      );
    }
  });

  var FriendList = React.createClass({
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
      key('space', this.handleKeyDown);
      this.loadFriendsFromServer();
    },
    handleKeyDown: function(){
      console.log('hey down');
    },
    render: function() {
      var friendNodes = this.state.data.map(function(friend, index){
        World.friends.place(friend.position, friend.id);
        return (
          <Friend name = {friend.name} id = {friend.id} key={index}/>
        );
      });
      return (
        <div className="friendList">
          {friendNodes}
        </div>
      );
    }
  });

  React.render(
    <FriendList url= "friends.json"/>,
    document.getElementById('uiContainer')
  );
})();