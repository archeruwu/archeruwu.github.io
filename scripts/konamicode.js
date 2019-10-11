
    
  // I did not make the Konami Code script.
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
  };
  
  var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
  
  var konamiCodePosition = 0;
  
  document.addEventListener('keydown', function(e) {
    var key = allowedKeys[e.keyCode];
    var requiredKey = konamiCode[konamiCodePosition];
    if (key == requiredKey) {
      konamiCodePosition++;
      if (konamiCodePosition == konamiCode.length) {
        activateCheats();
        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0;
    }
  });
  
  function activateCheats() {
  
    var audio = new Audio('./sound/heyooo.mp3');
    audio.volume = 0.2;
    audio.play();
        // idk who made this snip first but i found it on discord
        // var m=Math.random,d=(...a)=>a.map(b=>String.fromCharCode(b)).join(''),s={[d(112,111,115,105,116,105,111,110)]:d(97,98,115,111,108,117,116,101),[d(122,73,110,100,101,120)]:99999};(function a(){setTimeout(a,10*m());var b=document.createElement`div`;b.innerHTML=d(55358,56596),Object.entries(Object.assign({fontSize:(0|48*m())+16+d(112,120),left:(0|m()*innerWidth)+d(112,120),top:(0|m()*innerHeight)+d(112,120)},s)).map(([c,e])=>b.style[c]=e),document.body.appendChild(b)})();
        var src = "https://66.media.tumblr.com/45545c1479988c4288fa2b5580cae1e2/tumblr_pu8s81VRFQ1ynrp9fo1_400.gif";
        show_image("https://66.media.tumblr.com/45545c1479988c4288fa2b5580cae1e2/tumblr_pu8s81VRFQ1ynrp9fo1_400.gif", 400,225, "Google Logo");
  
  }
  function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    document.body.appendChild(img);
  }