
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  //return " "+s.replace(two_line, '<p></p>').replace(one_line, '<br>');
  return s;
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}
