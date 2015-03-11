

var Friend = React.createClass({
  render: function() {
    return (
      <div className="friend">
         this.props.name
      </div>
    );
  }
});

var FriendPanel = React.createClass({
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
      <div className="friend_panel">
        Friends
      </div>
    );
  }
});




React.render(
  <FriendPanel url = "friends.json"/>,
  document.getElementById('uiContainer')
);
