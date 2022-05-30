
    
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b',
    83: 's',
    87: 'w',
    71: 'g',
    77: 'm',
    74: 'j',
    79: 'o',
    82: 'r'
  };
    
  var majoraCode = ['m', 'a', 'j', 'o', 'r', 'a'];
  var placeholder_for_future_funnys = [];

  
  var CodePosition = 0;
  
  document.addEventListener('keydown', function(e) {
    var key = allowedKeys[e.keyCode];
    var requiredKey = majoraCode[CodePosition];
    if (key == requiredKey) {
      CodePosition++;
      if (CodePosition == majoraCode.length) {
        activateCheats();
        CodePosition = 0;
      }
    } else {
      CodePosition = 0;
    }
  });
  
  function activateCheats() {
  
    var audio = new Audio('./sound/majora.mp3');
    audio.volume = 0.2;
    audio.play();
        var src = "./images/majora.gif";
        show_image("./images/majora.gif", 265,305, "skullkid");
  
  }

  

  function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = alt;
    document.body.appendChild(img);
  }