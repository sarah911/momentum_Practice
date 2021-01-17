const ACCESS_KEY = "bf00b8ad65e5b3f04bdd54e5e654e906d8647f1b741f9be31b8b290235fc0dea";

$(document).ready(function(){
  //current time
  //update every 10 seconds;
  setCurrentTime();
  setInterval(function(){
    setCurrentTime();
  },10*1000);

  var username = getCookie('username');
  //check cookie
  if(username){
    
    $('.greeting').css('display','inline-block');
    $('.user-name').css('display','none');
    document.getElementById("todayFocus").style.display="block"
    var interest = getCookie('interest');
    var day = new Date();
    var hr = day.getHours();
    if(interest){
      $('.interest').css('display','none');
      $('.interest-text').html(interest);


      //$('.greeting').html(`Hello <span class="stored-name">${username}</span>.`);

    if (hr <= 11 && hr >= 5) {
      $('.greeting').html(`Good Morning, <span class="stored-name">${username}</span>.`);
    }
    else if (hr <= 18 && hr >= 12) {
      $('.greeting').html(`Good Afternoon, <span class="stored-name">${username}</span>.`);
    }
    else {
      $('.greeting').html(`Good Evening, <span class="stored-name">${username}</span>.`);
    }
    
    $('.greeting').fadeIn(function()
    {
      setCookie('interest', interest,365);
    });


      var picture_url = getCookie('picture');
      var photo_by_name = getCookie('photo-by-name');
      var photo_by_url = getCookie('photo-by-url');
      if(!picture_url){
        newimage(interest);
        picture_url = getCookie('picture');
      }
      $('.photoby').html(photo_by_name);
      $('.photoby').attr('href',photo_by_url);
      $('body').css('background-image',`url(${picture_url})`);
      $('.change-btn').css('display','block');
    }else{
      $('.greeting').html(`What's your interst?`);
      $('.interest').css('display','inline-block');
    }
  }else{
    $('.interest').css('display','none');
    $('.user-name').css('display','inline-block');
    $('.greeting').html(`What's your name?`);
    $('.greeting').css('display','inline-block');
  }

  $('.user-name').keypress(function(e) {
    if(e.which == 13) {
      var username = e.target.value;
      if(!username) return;
      $('.user-name').fadeOut(function(){
        $('.greeting').html(`what is your main focus for today?`);
        $('.interest').css('display','inline-block');
        $('.greeting').fadeIn(function(){
          setCookie('username', username,365);
        });
      });
    }
  });
  $('.interest').keypress(function(e) {
    if(e.which == 13) {
      var interest = e.target.value;
      if(!interest) return;
      newimage(interest);
      var username = getCookie('username');
      $('.interest').fadeOut(function(){
      var day = new Date();
      var hr = day.getHours();

      if (hr <= 11 && hr >= 5) {
            $('.greeting').html(`Good Morning, <span class="stored-name">${username}</span>.`);
            }
      else if (hr <= 18 && hr >= 12) {
            $('.greeting').html(`Good Afternoon, <span class="stored-name">${username}</span>.`);
            }
      else {
            $('.greeting').html(`Good Evening, <span class="stored-name">${username}</span>.`);
            }
        $('.greeting').fadeIn(function(){

          setCookie('interest', interest,365);
        });
      });
    }
  });

  $('.change-btn').click(function(){
    $('.greeting').html(`what is your main focus for today?`);
    $('.interest').css('display','inline-block');
    $('.interest').focus();
  });
});
function newimage(keyword){
  if(!ACCESS_KEY){
    alert("Please update your access key");
    return;
  }
  var url = `https://api.unsplash.com/search/photos?query=${keyword}&per_page=20&orientation=landscape&client_id=${ACCESS_KEY}`;
  $.get(url,function(data){
    var picture = data.results[0];

    var picture_url = picture.urls.raw;
    var photo_by_name = picture.user.name;
    var photo_by_url = picture.user.links.html;
    setCookie("picture",picture_url,0.5);
    setCookie("photo-by-name",photo_by_name,0.5);
    setCookie("photo-by-url",photo_by_url,0.5);
    $('.interest-text').html(keyword);
    $('.photoby').html(photo_by_name);
    $('.photoby').attr('href',photo_by_url);
    $('body').css('background-image',`url(${picture_url})`);
    $('.change-btn').css('display','block');
    document.getElementById("todayFocus").style.display="block"
  });
}

function setCurrentTime(){
  var now = new Date();
  $('.time').html(now.getHours()+":"+ (now.getMinutes()<10?'0':'') + now.getMinutes());
  $('.date').html(now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }));
}
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

!function(d,s,id)
{
  var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id))
  {
    js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);
  }
}(document,'script','weatherwidget-io-js');


// todo
//set cookie

var arr = [];

// Create a "close" button and append it to each list item
// var todo = getCookie('todo'); 
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
window.onload=function(){
  var list = document.querySelector('ul');
  list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  }, false);
  readCookie();
}


// Create a new list item when clicking on the "Add" button

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  addCookie(inputValue);
  var t = document.createTextNode(inputValue);
  li.appendChild(t);

  if (inputValue === '') {
    alert("You must write something!");
  } 
  else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

//Function to add cookie
function addCookie(value) {
  //push to array the input value
  arr.push(value);
  console.log(arr);
  //convert array to json for easily storing data to cookie and to read from it
  var json_str = JSON.stringify(arr);
  //CHANGE document.cookie = json_str;
  setCookie("ListCookie", json_str, 365)
}

function readCookie() {
  //get cookie data
  var json_str = getCookie("ListCookie");
  //parse json data from cookie
  arr = JSON.parse(json_str);
  for (var i = 0; i < arr.length; i++) {
    var li = document.createElement("li");
    var inputValue = arr[i]; //INPUT VALUE TO ARRAY INDEX ELEMENT
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue !== "") {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value;
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      };
    }
  }
}
