Template.leaderboard.helpers({
  rows: function() {
    return Players.find({}, {sort: {timeGood: -1}});
  }
});

Template.submit.helpers({
  playerInfo: function() {  
    console.log(PlayerInfo);
    //return Players.find({PlayerInfo});
    return PlayerInfo;
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
        var apiUrl;
        var thumbnailUrl;
        switch(arr[1]){
          case "US":
            apiUrl = "https://us.api.battle.net/wow/character/" + arr[2] + "/" + arr[0] + "?locale=en_US&apikey=" + apiKey;
            thumbnailUrl = "http://us.battle.net/static-render/us/";
            break;
          case "EU":
            apiUrl = "https://eu.api.battle.net/wow/character/" + arr[2] + "/" + arr[0] + "?locale=en_GB&apikey=" + apiKey;
            thumbnailUrl = "http://eu.battle.net/static-render/eu/";
            break;
        }
        var toonJSON = new HTTP.call( "GET", apiUrl, function(err, result)
        {
          if(!err){
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
          portrait: thumbnailUrl + result.data.thumbnail,
          createdAt: new Date(), // current time
          info: arr.join()
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
  },
  "submit .search": function(event){
    console.log("search");
    var nameSearch = event.target.name.value;
    var serverSearch = event.target.server.value;
    var regionSearch = event.target.region.value;
    if(!nameSearch || serverSearch == "") return;
    var player = Players.findOne({
      name: nameSearch,
      region: regionSearch,
      server: serverSearch
    });
    if(player){
      PlayerInfo = player._id;
      //console.log(PlayerInfo);
      playerInfo.info.value = player.info;
    }
    // Clear form
    event.target.name.value = "";
    event.target.server.value = "";
    event.target.region.value = "US";
    // Prevent default form submit
    return false;
  }
});
