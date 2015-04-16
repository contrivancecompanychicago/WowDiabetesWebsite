var $ = require('jquery');
var _ = require('underscore');


var UploadString = "Name" + "," + "US" + "," + "Server" + "," + "timeGood" + "," + "dayTimer" + "," + "glucoseLevel" + "," + "insulin" + "," + "insulinUsed" + "," + "foodEaten";
console.log(UploadString);
var arrUS = UploadString.split(",");
console.log(arrUS);

// check if it's player page
if ($('.player')) {
  $("[data-type='Name']").html(arrUS[0]);
  // HACK: skip over region name for now
  $("[data-type='Server']").html(arrUS[2]);
  $("[data-type='timeGood']").html(arrUS[3]);
  $("[data-type='dayTimer']").html(arrUS[4]);
  $("[data-type='glucoseLevel']").html(arrUS[5]);
  $("[data-type='insulin']").html(arrUS[6]);
  $("[data-type='insulinUsed']").html(arrUS[7]);
  $("[data-type='foodEaten']").html(arrUS[8]);
}

// UploadString = (Name + "," + "US" + "," + Server + "," + timeGood + "," + dayTimer .. "," .. glucoseLevel .. "," .. insulin .. "," .. insulinUsed .. "," .. foodEaten)
// return UploadString

// var UploadString = (Name + "," + "US" + "," + Server + "," + timeGood + "," + dayTimer + "," + glucoseLevel + "," + insulin + "," + insulinUsed + "," + foodEaten)
