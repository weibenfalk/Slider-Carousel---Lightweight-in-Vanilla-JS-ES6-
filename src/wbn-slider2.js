document.addEventListener('DOMContentLoaded', () => {
  // CHANGE ONLY THIS
  const SLIDETIME = 800; //ms
  // --------------------------

  const backButton = document.querySelector('.wbn-slider-back-btn');
  const forwardButton = document.querySelector('.wbn-slider-next-btn');
  // Select all slides and convert node to array for easy handling
  const allSlides = Array.from(document.querySelectorAll('.wbn-slide'));
  let clickable = true;
  let active = null;
  let newActive = null;

  // Init the slider
  initSlider();

  function initSlider() {
    // Set the CSS transition on the slides to the value we specified in SLIDETIME above
    allSlides.forEach(slide =>
      slide.setAttribute(
        'style',
        `transition: transform ${SLIDETIME}ms ease;
                 animation-duration: ${SLIDETIME}ms`,
      ),
    );
  }

  function changeSlide(direction) {
    if (clickable) {
      clickable = false;
      active = document.querySelector('.active');
      const activeSlideIndex = allSlides.indexOf(active);

      if (direction === 'back') {
        newActive =
          allSlides[
            (activeSlideIndex - 1 + allSlides.length) % allSlides.length
          ];
        active.classList.add('slideOutRight');
        newActive.classList.add('slideInLeft', 'active');
      } else if (direction === 'forward') {
        newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
        active.classList.add('slideOutLeft');
        newActive.classList.add('slideInRight', 'active');
      }
    }
  }

  //Event listeners
  forwardButton.addEventListener('click', () => {
    changeSlide('forward');
  });
  backButton.addEventListener('click', () => {
    changeSlide('back');
  });

  allSlides.forEach(slide => {
    slide.addEventListener('transitionend', e => {
      // Check for the old active transition an if clickable is false
      // to not trigger it more than once
      if (slide === active && !clickable) {
        clickable = true;
        // Remove all CSS animation classes on old active
        active.className = 'wbn-slide';
      }
    });
  });
});
