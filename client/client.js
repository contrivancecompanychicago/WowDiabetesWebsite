Template.leaderboard.helpers({
  rows: function() {
    return Players.find({}, {sort: {timeGood: -1}});
  }
});

Template.submit.events({
  "submit .submit": function (event) {
    console.log("submit");
    // This function is called when the new task form is submitted

    var text = event.target.text.value;
    if (!text) return;
    // parse
    var arr = text.split(",");
    
    // if player data already exists, update instead
    var player = Players.findOne({
      name: arr[0],
      region: arr[1],
      server: arr[2]
    });
    if (player) {
      Players.update(
        {
          _id: player._id
        }, 
        {
          $set:{
            timeGood: arr[3],
            totalTime: arr[4],
            glucoseLevel: arr[5],
            insulin: arr[6],
            insulinUsed: arr[7],
            foodEaten: arr[8],
          }
        }
      );
      
    } else {
        var apiKey = "keppgsca9m2af6fnkj4ta5vppb5v3u79";
        var apiUrl = "https://us.api.battle.net/wow/character/" + arr[2] + "/" + arr[0] + "?locale=en_US&apikey=" + apiKey;
        var toonJSON = new HTTP.call( "GET", apiUrl, function(err, result)
        {
          if(!err){
          var thumbnail = "http://us.battle.net/static-render/us/" + result.data.thumbnail;
          Players.insert({
          name: arr[0],
          region: arr[1],
          server: arr[2],
          timeGood: arr[3],
          totalTime: arr[4],
          glucoseLevel: arr[5],
          insulin: arr[6],
          insulinUsed: arr[7],
          foodEaten: arr[8],
          portrait: thumbnail,
          createdAt: new Date() // current time
          });
          }
        });
      
    }
    
    // Sort according to timeGood 
    Players.find({}, {sort: {timeGood: -1}});

    // Clear form
    event.target.text.value = "";
    Router.go('leaderboard');
    // Prevent default form submit
    return false;
  }
});
