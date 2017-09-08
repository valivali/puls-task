var fetchResults = function(){
  var txt = document.getElementById("searchText");
  var ul = document.getElementById("resultContainer");
  ul.innerHTML = '';
  var url = 'http://api.tvmaze.com/search/shows?q='+txt.value;
  txt.value = '';
  fetch(url).then(function(res){
    res.json().then(function(resultList){
      if (resultList.length === 0){
        var span = document.createElement('span');
        span.innerHTML = 'There are no results found.';
        ul.appendChild(span);
      }
      else
        return resultList.map(function(movie){
          var li = document.createElement('li');
          var img = document.createElement('img');
          var span = document.createElement('span');
          img.src = movie.show.image ? movie.show.image.original || movie.show.image.medium : 'https://placeimg.com/200/300/any';
          span.innerHTML = movie.show.name;
          li.appendChild(img);
          li.appendChild(span);
          ul.appendChild(li);
          
          li.onclick = function() {
            return showPopup(movie);
          };
        });
    })
  }).catch(function(err){
    console.log(err);
  });
};

var showPopup = function (movie){
  var overlay = document.getElementById('overlay');
  var content = document.getElementById('movie-details');
  
  openModal(movie);
  function openModal(movie){
    overlay.classList.remove("is-hidden");
    var img_container = document.createElement('div');
    var inner_img = document.createElement('img');
    inner_img.src = movie.show.image ? movie.show.image.original || movie.show.image.medium : 'https://placeimg.com/200/300/any';
    var name = document.createElement('span');
    name.innerHTML = 'Movie name: '+movie.show.name;
    var score = document.createElement('span');
    score.innerHTML = 'Movie score: '+movie.score;
    var genre = document.createElement('div');
    genre.innerHTML = 'Genres: '+movie.show.genres;
    var cast_title = document.createElement('span');
    cast_title.innerHTML = 'By the cast: ';
    var cast = document.createElement('ul');
    getCast(cast, movie.show.id);
    content.appendChild(img_container);
    img_container.appendChild(inner_img);
    content.appendChild(name);
    content.appendChild(score);
    content.appendChild(genre);
    content.appendChild(cast_title);
    content.appendChild(cast);
  }
};

var getCast = function(ul, movie_id){
  var url = 'http://api.tvmaze.com/shows/'+movie_id+'/cast';
  fetch(url).then(function(res){
    res.json().then(function(resultList){
      return resultList.map(function(actor){
        var li = document.createElement('li');
        var img = document.createElement('img');
        var span = document.createElement('span');
        img.src = actor.person.image ? actor.person.image.original || actor.person.image.medium : 'https://placeimg.com/200/300/any';
        span.innerHTML = actor.person.name;
        li.appendChild(img);
        li.appendChild(span);
        ul.appendChild(li);
      })
    })
  }).catch(function(err){
    console.log(err);
  });
};

function closeModal(){
  var overlay = document.getElementById('overlay');
  var content = document.getElementById('movie-details');
  content.innerHTML = '';
  overlay.classList.add("is-hidden");
}

