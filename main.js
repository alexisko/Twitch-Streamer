$(document).ready(function() {
  var url = 'https://wind-bow.gomix.me/twitch-api/';
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion",
  "freecodecamp", "storbeck", "habathcx", "RobotCaleb",
  "noobs2ninjas", "brunofin"];

  var activeBtn = 'all';
  getStreamData();

  $('.btn').click(function() {
    $('.btn').removeClass('active');
    $(this).toggleClass('active');
    activeBtn = $(this).val();
    getStreamData();
    console.log(activeBtn);
  });

  function getStreamData() {
    clearResults();
    channels.forEach(function(name) {
      $.getJSON(url + 'streams/' + name + '?callback=?').success(function(data) {
        var isStreaming = (data.stream !== null) ? true : false;
        // Get logo
        $.getJSON(url + 'users/' + name + '?callback=?').success(function(user) {
          console.log(user);
          if(user.hasOwnProperty('error') && activeBtn === 'all') {
            $('.container').append(nullStream(name));
          } else {
            if(activeBtn === 'all') {
              $('.container').append(isStreaming ? displayStream(data, user.logo) : offlineStream(name, user.logo));
            } else if(activeBtn === 'online') {
              if(isStreaming) {
                $('.container').append(displayStream(data, user.logo));
              }
            } else {
              if(!isStreaming && !user.hasOwnProperty('error')) {
                $('.container').append(offlineStream(name, user.logo));
              }
            }
          }
        });
      });
    });
  }

  function clearResults() {
    $('.container').empty();
  }

  function displayStream(data, logo) {
    var img = '<img src="' + logo +'">';
    var status = '<p>' + data.stream.game + ': ' + data.stream.channel.status + '</p>';
    var link = 'https://www.twitch.tv/' + data.stream.channel.display_name;
    var channel = '<a href="' + link + '"><span class="stream-title">' +
    data.stream.channel.display_name + '</span></a>';
    var stream = '<div class="stream">' + img + channel + status + '</div>';
    return stream;
  }

  function offlineStream(name, logo) {
    var img = '<img src="' + logo +'">';
    var link = 'https://www.twitch.tv/' + name;
    var channel = '<a href="' + link + '"><span class="stream-title">' +
    name + '</span></a>';
    var stream = '<div class="stream">' + img + channel + '</div>';
    return stream;
  }

  function nullStream(name) {
    var img = '<div class="no-img"></div>';
    var channel = '<span class="stream-title">' + name + '</span>';
    var desc = '<p>Channel not available.</p>';
    var stream = '<div class="stream">' + img + channel + desc + '</div>';
    return stream;
  }
});