var $ = require('jquery');
var _ = require('underscore');

// check if it's player page
// TODO: shitty code. refactor with key & value

function parseString () {
	var UploadString = $("input[name='uploadString']").get(0).value;
	var arrUS = UploadString.split(",");
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

$("button[name='uploadString']").click(parseString);
