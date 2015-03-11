

var Friend = React.createClass({
  teleportToFriend: function(){
    console.log('teleport!!!')
  },
  render: function() {
    return (
      <div className="friend" onClick ={this.teleportToFriend}>
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
    this.loadFriendsFromServer();
  },
  render: function() {
    var friendNodes = this.state.data.map(function(friend, index){
      return (
        <Friend name = {friend.name} key={index}/>
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
