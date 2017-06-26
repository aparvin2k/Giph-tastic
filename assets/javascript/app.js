// Create my sports themed array for gifs
var subject = ['basketball', 'dance', 'racing', 'nfl football', 'basketball', 'golf', 'skateboarding',
              'volleyball', 'baseball', 'snowboarding', 'gymnastics', 'soccer', 'dog'];
var searchQuery = '';
// Create the limit of gifs on a page
var limitCount = 10;

// Create dynamic buttons based on user inputs
$('#create-btn').on('click', function(event) {
  event.preventDefault();
  var userInput = $('#searchInput').val().trim();

// Create logic for user inputs and pushing the inputs to the end of the array
  if (userInput == '') {
    alert('Type request in search box then press submit button to create new button');
  } else {
    $('#searchInput').val('');
    subject.push(userInput);
    drawButtons();
  }
});

// Create the buttons dynamically
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

// Create the gif headings and the functionality to populate the gifs
$(document).on('click', '.gif-btn', function() {
  var term = $(this).attr('data-topic');
  searchQuery = term.split(' ').join('+');
  $('#gifHeading').html(term.toUpperCase() + ' FAIL');
  populateGifs();
});

// Create the gifs on the page based on the button clicked
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
// Create the behavior for the gifs
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
// Define the functionality of the user click on a gif
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
