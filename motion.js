(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* Count-up stat numbers: <span class="num" data-target="29" data-suffix="M"> */
  var nums = document.querySelectorAll('.stat .num[data-target]');
  if (nums.length) {
    var animateNum = function (el) {
      var target = parseFloat(el.getAttribute('data-target'));
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;
      if (reduced) { el.textContent = prefix + target + suffix; return; }
      var duration = 1400;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var val = (target * eased).toFixed(decimals);
        el.textContent = prefix + val + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    if (reduced || !('IntersectionObserver' in window)) {
      nums.forEach(animateNum);
    } else {
      var numIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateNum(entry.target);
            numIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      nums.forEach(function (el) { numIo.observe(el); });
    }
  }

  /* Nav shadow on scroll */
  var nav = document.querySelector('.site-nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 12) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Feedback form: star rating + friendly submit (mailto fallback, no backend here) */
  var starsWrap = document.getElementById('ffStars');
  var starsInput = document.getElementById('ffRatingValue');
  if (starsWrap && starsInput) {
    var starEls = starsWrap.querySelectorAll('span');
    var setStars = function (n) {
      starEls.forEach(function (s, i) { s.classList.toggle('active', i < n); });
      starsInput.value = n;
    };
    starEls.forEach(function (s, i) {
      s.addEventListener('click', function () { setStars(i + 1); });
      s.addEventListener('mouseenter', function () {
        starEls.forEach(function (el2, j) { el2.style.color = j <= i ? 'var(--gold)' : ''; });
      });
    });
    starsWrap.addEventListener('mouseleave', function () {
      starEls.forEach(function (el2) { el2.style.color = ''; });
    });
  }

  var feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('ffName').value.trim() || 'A client';
      var rating = starsInput ? (starsInput.value || '5') : '5';
      var message = document.getElementById('ffMessage').value.trim();
      var subject = encodeURIComponent('Feedback for AG Emerald — ' + name);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Rating: ' + rating + '/5\n\n' +
        message
      );
      window.location.href = 'mailto:info@agemerald.co.ke?subject=' + subject + '&body=' + body;
      var status = document.getElementById('ffStatus');
      if (status) status.textContent = 'Opening your email app to send this feedback…';
    });
  }
})();
