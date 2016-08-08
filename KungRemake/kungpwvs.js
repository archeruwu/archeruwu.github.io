var savetimeout;
var uivalue;
var fontload=0;
$(window).ready(function() {
   //setcurrentchat();
   document.getElementById("pt_twitch").style.background = "#800080";
   $("#slider").slider({
      range: "min",
      value: 50,
      min: 0,
      max: 100,
      slide: function(event, ui) {
         resizewidth(ui.value);
         clearTimeout(savetimeout);
         uivalue = ui.value;
         //delayed for less cpu usage
         savetimeout = setTimeout("createCookie('vsfullscreensize',uivalue,365);", 1000);
      }
   });
   resizeheight();
   restoreframesize();
   resizewidth($("#slider").slider("option", "value"));
   x = readCookie('vsfsflip');
   if (x == 1)
      dopageflip();
   highlightlock();
   livecheck();
   setInterval(livecheck, 120000);
   resizeui();
	var hash = window.location.hash.substring(1);
	if(hash){
		if(hash=="vinesauceyt"){
			$('#iframevideo').prop('src','https://www.youtube.com/embed/JHxEfmL-fVQ?autoplay=1');
			$('#iframechat').prop('src','https://www.twitch.tv/vinesauce/chat?popout=');
			switchdoublechat("vinesauce");
		} else if(hash=="geepmyt"){
			$('#iframevideo').prop('src','https://www.youtube.com/embed/DlTskYpVm-0?autoplay=1');
			$('#iframechat').prop('src','https://www.twitch.tv/geepm/chat?popout=');
			switchdoublechat("geepm");
		} else{
			$('#iframevideo').prop('src','twitch.html?chan='+hash);
			$('#iframechat').prop('src','https://www.twitch.tv/'+hash+'/chat?popout=');
			switchdoublechat(hash);
		}
	}
});
$(window).load(function() {
   livecounter();
   setInterval(livecounter, 150000);
   resizeui();
});
function livecounter() {
   $.get("counter.php", function(data) {
      $('#counter').html(data);
      resizeui();
   });
   $.get("./steam", function(data) {
      if (isInt($.trim(data))) {
         $('#steam').html("TF2[" + $.trim(data) + "]");
         resizeui();
      }
   });
}

function isInt(value) {
   var x;
   if (isNaN(value)) {
      return false;
   }
   x = parseFloat(value);
   return (x | 0) === x;
}

function switchdoublechat(chan) {
   document.getElementById("double").innerHTML = "<a href='double.html?chan=" + chan + "' onClick=\"document.getElementById('iframechat').src='double.html?chan=" + chan + "';document.getElementById('tw').style.background='#800080';document.getElementById('pt_twitch').style.background='#800080';return false;\">x2</a>";
   document.getElementById("twitchbutton").innerHTML = "<a href='https://www.twitch.tv/" + chan + "/chat' id='tw' onClick=\"document.getElementById('iframechat').src='https://www.twitch.tv/" + chan + "/chat';document.getElementById('tw').style.background='#800080';document.getElementById('pt_twitch').style.background='transparent';return false;\">TW</a>";
}

function randint(low, high) {
   return Math.floor((Math.random() * high) + low);
}

function html5twitch() {
   if (readCookie('twitchhtml5') == 1) {
      createCookie('twitchhtml5', 0, 365);
      alert('HTML5 Player disabled!');
   } else {
      createCookie('twitchhtml5', 1, 365);
      alert('HTML5 Player Enabled!  Note: works only in Chrome currently, toggle again if it does not play.');
   }
   document.getElementById('iframevideo').src = document.getElementById('iframevideo').src;
}

function toggleads() {
   x = readCookie('disablead');
   if (x == "yes") {
      createCookie('disablead', 0, 14);
   } else {
      createCookie('disablead', "yes", 14);
   }
   alert('Refresh to see changes');
}

function livecheck() {
   x = randint(1, 2);
   if (x == 1) {
      $.get("live.php", function(data) {
         $("#live").html(data);
         size = $('.alive').length;
         $('#livecount').html('Live[' + size + ']');
         top.document.title = '[' + size + ']=Live VS Fullscreen';
         restoreframesize();
      });
   } else {
      $.get("live.txt", function(data) {
         $("#live").html(data);
         size = $('.alive').length;
         $('#livecount').html('Live[' + size + ']');
         top.document.title = '[' + size + ']=Live VS Fullscreen';
         restoreframesize();
      })
   }
}
var livetimeout;
var donthover = false;

function showlive() {
   if (donthover == false) {
      clearTimeout(livetimeout);
      document.getElementById('links').style.visibility = "hidden";
      document.getElementById('live').style.visibility = "visible";
      document.getElementById('search').style.visibility = "hidden";
      document.getElementById('searchb').style.visibility = "hidden";
      livetimeout = setTimeout(function() {
         document.getElementById('links').style.visibility = "visible";
         document.getElementById('live').style.visibility = "hidden";
         document.getElementById('search').style.visibility = "hidden";
         document.getElementById('searchb').style.visibility = "hidden";
      }, 7000);
   }
}

function hidelive() {
   clearTimeout(livetimeout);
   document.getElementById('links').style.visibility = "visible";
   document.getElementById('live').style.visibility = "hidden";
   document.getElementById('search').style.visibility = "hidden";
   document.getElementById('searchb').style.visibility = "hidden";
   donthover = true;
   setTimeout(function() {
      donthover = false;
   }, 1000);
}

function showsearch() {
   clearTimeout(livetimeout);
   document.getElementById('links').style.visibility = "hidden";
   document.getElementById('live').style.visibility = "hidden";
   document.getElementById('search').style.visibility = "visible";
   document.getElementById('searchb').style.visibility = "hidden";
   livetimeout = setTimeout(function() {
      document.getElementById('links').style.visibility = "visible";
      document.getElementById('live').style.visibility = "hidden";
      document.getElementById('search').style.visibility = "hidden";
      document.getElementById('searchb').style.visibility = "hidden";
   }, 7000);
}

function showsearchb() {
   clearTimeout(livetimeout);
   document.getElementById('links').style.visibility = "hidden";
   document.getElementById('live').style.visibility = "hidden";
   document.getElementById('searchb').style.visibility = "visible";
   document.getElementById('search').style.visibility = "hidden";
   livetimeout = setTimeout(function() {
      document.getElementById('links').style.visibility = "visible";
      document.getElementById('live').style.visibility = "hidden";
      document.getElementById('searchb').style.visibility = "hidden";
      document.getElementById('search').style.visibility = "hidden";
   }, 7000);
}

function pageflip() {
   x = readCookie('vsfsflip');
   if (x == 1) {
      createCookie('vsfsflip', 0, 365);
   } else {
      createCookie('vsfsflip', 1, 365);
   }
   dopageflip();
}

function dopageflip() {
   x = readCookie('vsfsflip');
   if (x == 1) {
      $("#video").css("float", "right");
      $("#chatroom").css("float", "left");
   } else {
      $("#video").css("float", "left");
      $("#chatroom").css("float", "right");
   }
}
$(window).resize(function() {
   resizeheight();
   resizewidth($("#slider").slider("option", "value"));
});

function resizeheight() {
   $('#video, #chatroom').css("height", $(window).height() - 40);
}

function restoreframesize() {
   x = readCookie('vsfullscreensize');
   if (x && x >= 1 && x < 100) {
      resizewidth(x);
      $("#slider").slider("option", "value", x)
   }
}

function resizewidth(left) {
   $('#chatroom').css("display", "block");
   $('#video').css("display", "block");
   if (left >= 1 && left < 100) {
      $('#video').css("width", Math.ceil($(window).width() * left / 100));
      //$('#video').animate({width: $(window).width()*left/100},500)
      $('#chatroom').css("width", Math.floor($(window).width() * (100 - left) / 100));
      //228 = slider, 12 = padding left
      $('#links, #live').css("width", Math.floor($(window).width() - 302));
      resizeui();
   }
   if (left == 100) {
      $('#video').css("width", $(window).width() * left / 100);
      $('#chatroom').css("display", "none");
      $('#chatroom').css("width", 0);
   }
   if (left == 0) {
      $('#chatroom').css("width", $(window).width());
      $('#video').css("display", "none");
      $('#video').css("width", 0);
   }
}
var textsize;

function resizeui() {
   textsize = 24;
   $('#links').css("font-size", textsize);
   doresize();
}

function doresize() {
   if ($('#links').outerHeight(true) > 38) {
      textsize--;
      $('#links').css("font-size", textsize);
      $('.menuimg').css("height", textsize);
      $('.menuimg').css("width", textsize);
      doresize();
   }
}

function popitup(url, winwidth, winheight) {
   newwindow = window.open(url, 'name', 'height=' + winheight + ',width=' + winwidth + ',toolbar=no,status=no,scrollbars=no,location=no');
   if (window.focus) {
      newwindow.focus()
   }
   return false;
}

function setcurrentchat() {
   document.getElementById("iframechat").src = "chatroom.html";
   document.getElementById("tw").style.background = "transparent";
   document.getElementById("pt_twitch").style.background = "#800080";
}

function togglelock() {
   if (readCookie('twitchlock') != 1) {
      createCookie('twitchlock', 1, 365);
      alert('This page will now confirm before leaving the page.');
   } else {
      createCookie('twitchlock', 0, 365);
      alert('This page will not confirm before leaving the page.');
   }
}

function highlightlock() {
   if (readCookie('twitchlock') == 1) {
      $('#lock').css("background", "#800080");
   } else {
      $('#lock').css("background", "transparent");
   }
}

function loadchatango() {
   document.getElementById("iframechat").src = "chatroom.html";
}
window.onbeforeunload = function() {
   if (readCookie('twitchlock') == 1)
      return "Confirm leaving this page because clicking Twitch video redirects you.";
}
