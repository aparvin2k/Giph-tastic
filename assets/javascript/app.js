var subject = ['basketball', 'dance', 'racing', 'football', 'basketball', 'golf', 'skateboarding',
              'volleyball', 'baseball', 'snowboarding', 'gymnastics', 'soccer', 'dog'];
var searchQuery = '';
var limitCount = 10;

$('#create-btn').on('click', function(event) {
  event.preventDefault();
  var userInput = $('#searchInput').val().trim();

  if (userInput == '') {
    alert('Type request in search box then press submit button to create new button');
  } else {
    $('#searchInput').val('');
    subject.push(userInput);
    drawButtons();
  }
});

function drawButtons() {
  $('#btn-div').empty();

  for (var i = 0; i < subject.length; i++) {
    var button = $('<button>');
    button.addClass('btn btn-primary btn-lg gif-btn');
    button.attr('data-topic', subject[i]);
    button.text(subject[i]);
    $('#btn-div').append(button);
  }
};

$(document).on('click', '.gif-btn', function() {
  var term = $(this).attr('data-topic');
  searchQuery = term.split(' ').join('+');
  $('#gifHeading').html(term.toUpperCase() + ' FAIL');
  populateGifs();
});

function populateGifs() {

  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + searchQuery + '+fail&api_key=82d7ffa890ea496bb66442b40102426b&limit=' + limitCount;

  $.ajax({
      url: queryURL,
      method: 'GET',
    })
    .done(function(response) {

      console.log(response);
      console.log(queryURL);

      $('#results').empty();

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        var staticUrl = results[i].images.fixed_height_still.url;
        var animateUrl = results[i].images.fixed_height.url;
        var gifDiv = $('<div class="gif-div">');
        var rating = $('<p class="rating">').text("Rating: " + results[i].rating);
        var fieldImage = $('<img>').attr('data-state', 'still');
        fieldImage.addClass('gif-img');
        fieldImage.attr({'src': staticUrl, 'data-state': 'still', 'data-still': staticUrl,
          'data-animate': animateUrl, 'alt': searchQuery});
        gifDiv.append(rating);
        gifDiv.append(fieldImage);
        $('#results').append(gifDiv);
      }
    });
};

$(document).on('click', '.gif-img', function() {
  var state = $(this).attr('data-state');
  if (state === 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
    $(this).css('opacity', '1.0');
  } else {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
    $(this).css('opacity', '0.5');
  }
});
drawButtons();
