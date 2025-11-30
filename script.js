// No music during countdown
window.addEventListener('DOMContentLoaded', function() {
  // Countdown starts silently
});

// Pause music when user leaves the page
document.addEventListener('visibilitychange', function() {
  const clappingSound = document.getElementById('clapping-sound');
  const wishesMusic = document.getElementById('wishes-music');
  if (document.hidden) {
    clappingSound.pause();
    wishesMusic.pause();
  } else {
    if (!clappingSound.paused && clappingSound.currentTime > 0) clappingSound.play();
    if (!wishesMusic.paused && wishesMusic.currentTime > 0) wishesMusic.play();
  }
});

// Pause music when user switches tab or minimizes window
window.addEventListener('blur', function() {
  const clappingSound = document.getElementById('clapping-sound');
  const wishesMusic = document.getElementById('wishes-music');
  clappingSound.pause();
  wishesMusic.pause();
});

// Resume music when user returns to the page
window.addEventListener('focus', function() {
  const clappingSound = document.getElementById('clapping-sound');
  const wishesMusic = document.getElementById('wishes-music');
  if (clappingSound.currentTime > 0 && wishesMusic.currentTime === 0) clappingSound.play();
  if (wishesMusic.currentTime > 0) wishesMusic.play();
});

const content = document.getElementById('content');
const footer = document.getElementsByTagName('footer')[0];
const timer = document.getElementById('timer');

const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

// Set countdown to December 1, 2025
let countDown = new Date('December 1, 2025 00:00:00').getTime(),
  x = setInterval(function () {
    let now = new Date().getTime(),
      distance = countDown - now;
    document.getElementById('days').innerText = Math.floor(distance / (day)),
    document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
      document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
      document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

    if (distance < 0) {

      timer.classList.add('d-none');
      confetti();
      clearInterval(x);
      
      // Play clapping sound with autoplay fallback
      const clappingSound = document.getElementById('clapping-sound');
      const playPromise = clappingSound.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay is blocked, show a message to prompt user interaction
          const prompt = document.createElement('div');
          prompt.innerHTML = '<i class="fas fa-hand-pointer"></i> Click anywhere to start';
          prompt.style.position = 'fixed';
          prompt.style.top = '50%';
          prompt.style.left = '50%';
          prompt.style.transform = 'translate(-50%, -50%)';
          prompt.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
          prompt.style.color = 'white';
          prompt.style.padding = '20px 30px';
          prompt.style.borderRadius = '15px';
          prompt.style.fontSize = '16px';
          prompt.style.fontWeight = '500';
          prompt.style.zIndex = '10000';
          prompt.style.cursor = 'pointer';
          prompt.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
          prompt.style.textAlign = 'center';
          prompt.style.maxWidth = '80%';
          document.body.appendChild(prompt);

          document.body.addEventListener('click', () => {
            clappingSound.play();
            document.body.removeChild(prompt);
          }, { once: true });
        });
      }
      
      _slideSatu();
    }

  }, second)

const _slideSatu = function () {
  const tap = document.getElementById('tap');
  const slideSatu = document.getElementById('slideSatu');
  slideSatu.classList.remove('d-none');
  setTimeout(function () {
    tap.classList.remove('d-none');
    document.body.addEventListener('click', function () {
      _slideDua();
    })
  }, 7000);
};

const _slideDua = function () {
  const slideSatu = document.getElementById('slideSatu');
  const tap = document.getElementById('tap');
  const slideDua = document.getElementById('slideDua');

  // Fade out clapping and fade in wishes music when wishes start
  const clappingSound = document.getElementById('clapping-sound');
  const wishesMusic = document.getElementById('wishes-music');
  
  // Fade out clapping
  let clappingVolume = 1;
  const fadeOutClapping = setInterval(() => {
    if (clappingVolume > 0) {
      clappingVolume -= 0.1;
      clappingSound.volume = Math.max(0, clappingVolume);
    } else {
      clearInterval(fadeOutClapping);
      clappingSound.pause();
      clappingSound.volume = 1;
    }
  }, 100);
  
  // Fade in wishes music with autoplay fallback
  wishesMusic.volume = 0;
  const playPromise = wishesMusic.play();
  
  if (playPromise !== undefined) {
    playPromise.then(() => {
      // Successfully started, fade in
      let wishesVolume = 0;
      const fadeInWishes = setInterval(() => {
        if (wishesVolume < 1) {
          wishesVolume += 0.05;
          wishesMusic.volume = Math.min(1, wishesVolume);
        } else {
          clearInterval(fadeInWishes);
        }
      }, 100);
    }).catch(() => {
      // If autoplay is blocked, show prompt
      const prompt = document.createElement('div');
      prompt.innerHTML = '<i class="fas fa-music"></i> Click to continue with music';
      prompt.style.position = 'fixed';
      prompt.style.top = '50%';
      prompt.style.left = '50%';
      prompt.style.transform = 'translate(-50%, -50%)';
      prompt.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
      prompt.style.color = 'white';
      prompt.style.padding = '20px 30px';
      prompt.style.borderRadius = '15px';
      prompt.style.fontSize = '16px';
      prompt.style.fontWeight = '500';
      prompt.style.zIndex = '10000';
      prompt.style.cursor = 'pointer';
      prompt.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
      prompt.style.textAlign = 'center';
      prompt.style.maxWidth = '80%';
      document.body.appendChild(prompt);

      document.body.addEventListener('click', () => {
        wishesMusic.play().then(() => {
          let wishesVolume = 0;
          wishesMusic.volume = 0;
          const fadeInWishes = setInterval(() => {
            if (wishesVolume < 1) {
              wishesVolume += 0.05;
              wishesMusic.volume = Math.min(1, wishesVolume);
            } else {
              clearInterval(fadeInWishes);
            }
          }, 100);
        });
        document.body.removeChild(prompt);
      }, { once: true });
    });
  }

  setTimeout(function () {
    slideSatu.classList.replace('animate__slideInDown', 'animate__backOutDown');
    tap.classList.add('d-none');
    setTimeout(function () {
      slideSatu.classList.add('d-none');
    }, 1000);
  }, 1000);

  slideDua.classList.remove('d-none');
  setTimeout(function () {
    slideDua.classList.replace('animate__zoomInDown', 'animate__fadeOutLeft');
    slideDua.classList.remove('animate__delay-2s', 'animate__slow');
    setTimeout(function () {
      slideDua.remove();
      _slideTiga();
    }, 1000);
  }, 38000);
};

const _slideTiga = function () {
  const tap = document.getElementById('tap');
  const slideTiga = document.getElementById('slideTiga');

  slideTiga.classList.remove('d-none');
  setTimeout(function () {
    slideTiga.classList.remove('animate__delay-2s', 'animate__slow');
    slideTiga.classList.replace('animate__fadeInRight', 'animate__fadeOut');
    setTimeout(function () {
      slideTiga.remove();
      _slideEmpat();
    }, 1000);
  }, 41000);
}

function getRandomPosition(element) {
  var x = document.body.offsetHeight - element.clientHeight;
  var y = document.body.offsetWidth - element.clientWidth;
  var randomX = Math.floor(Math.random() * 500);
  var randomY = Math.floor(Math.random() * y);
  return [randomX, randomY];
};

const _slideEmpat = function () {
  const slideEmpat = document.getElementById('slideEmpat');
  const btn = document.getElementsByTagName('button');
  slideEmpat.classList.remove('d-none');

  btn[0].addEventListener('click', function () {
    var xy = getRandomPosition(slideEmpat);
    slideEmpat.style.top = xy[0] + 'px';
    // slideEmpat.style.left = xy[1] + 'px';
  });

  btn[1].addEventListener('click', function () {
    slideEmpat.classList.replace('animate__fadeInDown', 'animate__bounceOut');
    slideEmpat.classList.remove('animate__delay-2s');
    setTimeout(function () {
      slideEmpat.remove()
      setTimeout(() => {
        _slideLima();
      }, 500);
    }, 1000);
  })
};

const _slideLima = function () {
  const slideLima = document.getElementById('slideLima');
  slideLima.classList.remove('d-none');
  const trims = document.getElementById('trims');

  setTimeout(() => {
    trims.classList.remove('d-none');
  }, 1000);

  slideLima.addEventListener('animationend', () => {
    slideLima.classList.add('animate__delay-3s')
    slideLima.classList.replace('animate__bounceIn', 'animate__fadeOut');
    trims.classList.add('animate__animated', 'animate__fadeOut', 'animate__delay-3s');
    setTimeout(() => {
      trims.remove();
      setTimeout(() => {
        slideLima.remove();
      }, 1000);
    }, 6000);
  });
};


new TypeIt("#teks1", {
  strings: ["Looking back at all the moments we've shared together...", "Every laugh, every conversation, every memory we created.", "The times when we supported each other through ups and downs.", "All those little moments that meant so much.", "Thank you for being a part of my journey.", "These memories will always hold a special place in my heart."],
  startDelay: 4000,
  speed: 75,
  waitUntilVisible: true
}).go();

new TypeIt("#teks2", {
  strings: ["On your special day, I wish you all the happiness in the world.", "May every dream you chase turn into reality.", "May success follow you in every step you take.", "May God bless you with health, prosperity, and peace.", "Happy Birthday! Here's to another amazing year ahead!", "Happy Birthday Meri Ullu, Meri Khushi, Meri Bestie.", "Bye Bye Beautiful Hareem !"],
  startDelay: 2000,
  speed: 75,
  waitUntilVisible: true,
  breakLines: true
}).go();


new TypeIt("#trims", {
  strings: ["Thank you for being you."],
  startDelay: 2000,
  speed: 100,
  loop: false,
  waitUntilVisible: true,
}).go();



'use strict';

var onlyOnKonami = false;

function confetti() {
  // Globals
  var $window = $(window),
    random = Math.random,
    cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI,
    PI2 = PI * 2,
    timer = undefined,
    frame = undefined,
    confetti = [];

  var runFor = 2000
  var isRunning = true

  setTimeout(() => {
    isRunning = false
  }, runFor);

  // Settings
  var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    pointer = 0;

  var particles = 150,
    spread = 20,
    sizeMin = 5,
    sizeMax = 12 - sizeMin,
    eccentricity = 10,
    deviation = 100,
    dxThetaMin = -.1,
    dxThetaMax = -dxThetaMin - dxThetaMin,
    dyMin = .13,
    dyMax = .18,
    dThetaMin = .4,
    dThetaMax = .7 - dThetaMin;

  var colorThemes = [
    function () {
      return color(200 * random() | 0, 200 * random() | 0, 200 * random() | 0);
    },
    function () {
      var black = 200 * random() | 0;
      return color(200, black, black);
    },
    function () {
      var black = 200 * random() | 0;
      return color(black, 200, black);
    },
    function () {
      var black = 200 * random() | 0;
      return color(black, black, 200);
    },
    function () {
      return color(200, 100, 200 * random() | 0);
    },
    function () {
      return color(200 * random() | 0, 200, 200);
    },
    function () {
      var black = 256 * random() | 0;
      return color(black, black, black);
    },
    function () {
      return colorThemes[random() < .5 ? 1 : 2]();
    },
    function () {
      return colorThemes[random() < .5 ? 3 : 5]();
    },
    function () {
      return colorThemes[random() < .5 ? 2 : 4]();
    }
  ];

  function color(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  // Cosine interpolation
  function interpolation(a, b, t) {
    return (1 - cos(PI * t)) / 2 * (b - a) + a;
  }

  // Create a 1D Maximal Poisson Disc over [0, 1]
  var radius = 1 / eccentricity,
    radius2 = radius + radius;

  function createPoisson() {
    // domain is the set of points which are still available to pick from
    // D = union{ [d_i, d_i+1] | i is even }
    var domain = [radius, 1 - radius],
      measure = 1 - radius2,
      spline = [0, 1];
    while (measure) {
      var dart = measure * random(),
        i, l, interval, a, b, c, d;

      // Find where dart lies
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        a = domain[i], b = domain[i + 1], interval = b - a;
        if (dart < measure + interval) {
          spline.push(dart += a - measure);
          break;
        }
        measure += interval;
      }
      c = dart - radius, d = dart + radius;

      for (i = domain.length - 1; i > 0; i -= 2) {
        l = i - 1, a = domain[l], b = domain[i];
        // c---d          c---d  Do nothing
        //   c-----d  c-----d    Move interior
        //   c--------------d    Delete interval
        //         c--d          Split interval
        //       a------b
        if (a >= c && a < d)
          if (b > d) domain[l] = d; // Move interior (Left case)
          else domain.splice(l, 2); // Delete interval
        else if (a < c && b > c)
          if (b <= d) domain[i] = c; // Move interior (Right case)
          else domain.splice(i, 0, c, d); // Split interval
      }

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i + 1] - domain[i];
    }

    return spline.sort();
  }

  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '0';
  container.style.overflow = 'visible';
  container.style.zIndex = '9999';

  // Confetto constructor
  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style,
      innerStyle = this.inner.style;
    outerStyle.position = 'absolute';
    outerStyle.width = (sizeMin + sizeMax * random()) + 'px';
    outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
    innerStyle.width = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
    this.axis = 'rotate3D(' +
      cos(360 * random()) + ',' +
      cos(360 * random()) + ',0,';
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + 'deg)';

    this.x = $window.width() * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + 'px';
    outerStyle.top = this.y + 'px';

    // Create the periodic spline
    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      // Compute spline and convert to polar
      var phi = this.frame % 7777 / 7777,
        i = 0,
        j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + 'px';
      outerStyle.top = this.y + rho * sin(phi) + 'px';
      innerStyle.transform = this.axis + this.theta + 'deg)';
      return this.y > height + deviation;
    };
  }


  function poof() {
    if (!frame) {
      // Append the container
      document.body.appendChild(container);

      // Add confetti

      var theme = colorThemes[onlyOnKonami ? colorThemes.length * random() | 0 : 0],
        count = 0;

      (function addConfetto() {

        if (onlyOnKonami && ++count > particles)
          return timer = undefined;

        if (isRunning) {
          var confetto = new Confetto(theme);
          confetti.push(confetto);

          container.appendChild(confetto.outer);
          timer = setTimeout(addConfetto, spread * random());
        }
      })(0);


      // Start the loop
      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = $window.height();

        for (var i = confetti.length - 1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return frame = requestAnimationFrame(loop);

        // Cleanup
        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  $window.keydown(function (event) {
    pointer = konami[pointer] === event.which ?
      pointer + 1 :
      +(event.which === konami[0]);
    if (pointer === konami.length) {
      pointer = 0;
      poof();
    }
  });

  if (!onlyOnKonami) poof();
};
