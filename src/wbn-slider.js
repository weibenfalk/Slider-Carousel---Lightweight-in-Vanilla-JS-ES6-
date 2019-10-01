document.addEventListener('DOMContentLoaded', () => {
  // CHANGE ONLY THIS
  const SLIDETIME = 300; //ms
  // --------------------------

  const backButton = document.querySelector('.wbn-slider-back-btn');
  const forwardButton = document.querySelector('.wbn-slider-next-btn');
  // Select all slides and convert node to array for easy handling
  const allSlides = Array.from(document.querySelectorAll('.wbn-slide'));
  let clickable = true;

  // Init the slider
  initSlider();

  /**
   * Function to initialize the slider
   */
  function initSlider() {
    // Set the CSS transition on the slides to the value we specified in SLIDETIME above
    allSlides.forEach(slide =>
      slide.setAttribute(
        'style',
        `transition: transform ${SLIDETIME}ms ease;
                 animation-duration: ${SLIDETIME}ms`,
      ),
    );

    // const sliderHeight = document.querySelector('#wbn-slider').offsetHeight;
    // // Set the height on the overlay texts to slider height if there is any
    // const overlays = document.querySelectorAll('.wbn-overlay-text');
    // overlays.forEach(element => (element.style.height = `${sliderHeight}px`));
  }

  /**
   * Function who runs when the user has clicked either forward or backward buttons
   *
   * @param {string} direction - A string containing either "back" or "forward" for knowing direction
   */
  function changeSlide(direction) {
    if (clickable) {
      clickable = false;
      const active = document.querySelector('.active');
      updateUI(direction, active);
    }
  }

  /**
   * Function that redraws the slider UI.
   *
   * @param {string} direction - A string containing either "back" or "forward" for knowing direction
   * @param {DOM Element} active - The active slide
   */
  function updateUI(direction, active) {
    const activeSlideIndex = allSlides.indexOf(active);
    let newActive = null;

    if (direction === 'back') {
      newActive =
        allSlides[(activeSlideIndex - 1 + allSlides.length) % allSlides.length];
      active.classList.add('slideOutRight');
      newActive.classList.add('slideInLeft', 'active');
    } else if (direction === 'forward') {
      newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
      active.classList.add('slideOutLeft');
      newActive.classList.add('slideInRight', 'active');
    }

    // Function that activates after the slide animations
    setTimeout(() => {
      clickable = true;
      // Remove all CSS animation classes on old active
      active.className = 'wbn-slide';

      // if (newActive.querySelector('.wbn-overlay-text')) {
      //   newActive
      //     .querySelector('.wbn-overlay-text')
      //     .classList.add('wbn-overlay-text-show');
      // }
    }, SLIDETIME + 20);

    // Fade back the text on the old active slide by checking if the slide has an overlay text
    // if (active.querySelector('.wbn-overlay-text')) {
    //   active
    //     .querySelector('.wbn-overlay-text')
    //     .classList.remove('wbn-overlay-text-show');
    // }
  }

  //Event listeners
  forwardButton.addEventListener('click', () => {
    changeSlide('forward');
  });
  backButton.addEventListener('click', () => {
    changeSlide('back');
  });
});
