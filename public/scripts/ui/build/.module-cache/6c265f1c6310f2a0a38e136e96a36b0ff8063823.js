

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

  getInititalState: function(){
    debugger
    return {data:[]};
  },

  componentDidMount: function(){
    debugger
    this.loadFriendsFromServer();
  },
  render: function() {
  //   var friendNodes = this.state.data.map(function(friend, index){
  //     return(
  //       <Friend name = {friend.name} key={index}/>
  //     )
  //   });
  //   return (
  //     <div className="friends">
  //       {friendNodes}
  //     </div>
  //   );
  }
});




React.render(
  React.createElement(Friends, {url: "friends.json"}),
  document.getElementById('uiContainer')
);
