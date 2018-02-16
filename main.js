$(document).ready(function() {
  var url = 'https://wind-bow.gomix.me/twitch-api/';
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion",
  "freecodecamp", "storbeck", "habathcx", "RobotCaleb",
  "noobs2ninjas"];
  channels.forEach(function(name) {
    $.getJSON(url + 'streams/' + name + '?callback=?').success(function(data) {
      console.log(data);
      var isStreaming = (data.stream !== null) ? true : false;
      if(isStreaming) {
        var online = displayStream(data);
        $('.online').append(online);
      } else {
        var offline = offlineStream(name);
        $('.offline').append(offline);
      }
    });
  });

  function displayStream(data) {
    var img = '<img src="' + data.stream.preview.medium +'">';
    var status = '<p>' + data.stream.game + ': ' + data.stream.channel.status + '</p>';
    var link = 'https://www.twitch.tv/' + data.stream.channel.display_name;
    var channel = '<a href="' + link + '"><span class="stream-title">' +
    data.stream.channel.display_name + '</span></a>';
    var stream = '<div class="stream">' + img + channel + status + '</div>';
    return stream;
  }

  function offlineStream(name) {
    var img = '<div class="no-img"></div>';
    var link = 'https://www.twitch.tv/' + name;
    var channel = '<a href="' + link + '"><span class="stream-title">' +
    name + '</span></a>';
    var stream = '<div class="stream">' + img + channel + '</div>';
    return stream;
  }
});