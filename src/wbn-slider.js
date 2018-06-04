document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector('.wbn-slider-back-btn');
  const forwardButton = document.querySelector('.wbn-slider-next-btn');
  // Select all slides and convert node to array for easy handling
  const allSlides = Array.from(document.querySelectorAll('.wbn-slide'));
  let newActive;
  let clickable = true;

  // Init the slider
  initSlider();

  /**
  * Function to initialize the slider
  */
  function initSlider() {
    const active = document.querySelector('.active');
    const slideInterval = calcInterval(allSlides, active);
    const sliderHeight = document.querySelector('#wbn-slider').offsetHeight;

    allSlides[slideInterval.activeMinusOne].classList.add('slideLeft');
    allSlides[slideInterval.activePlusOne].classList.add('slideRight');

    // Set the height on the overlay texts to slider height if there is any
    const overlays = document.querySelectorAll('.wbn-overlay-text');
    overlays.forEach( element => element.style.height = `${sliderHeight}px`);
  }

  /**
  * Function who runs when the user has clicked either forward or backward buttons
  *
  * @param {string} directionn - A string containing either "back" or "forward" for knowing direction
  */
  function changeSlide(direction) {
    if(clickable) {
      const dir = direction;
      const active = document.querySelector('.active');
      const slideInterval = calcInterval(allSlides, active);
      clickable = false;

      allSlides[slideInterval.active].addEventListener('transitionend', hideElement);

      updateUI(dir, slideInterval);
    }
  }

  /**
  * Function that calculates an interval of five slides(indexes) around the active slide.
  *
  * @param {array} slideArray - An array containing all the slides
  * @param {HTMLElement} activeSlide - The current active slide
  *
  * @return {object} An object with indexes containing the active slide, the two slides before that and the two slides after that
  */
  function calcInterval(slideArray, activeSlide) {
    const slideInterval = {};
    const totalSlides = slideArray.length;
    const activeSlideIndex = slideArray.indexOf(activeSlide);

    slideInterval.activeMinusTwo = (activeSlideIndex - 2 + totalSlides) % totalSlides;
    slideInterval.activeMinusOne = (activeSlideIndex - 1 + totalSlides) % totalSlides;
    slideInterval.active = activeSlideIndex;
    slideInterval.activePlusOne = (activeSlideIndex + 1) % totalSlides;
    slideInterval.activePlusTwo = (activeSlideIndex + 2) % totalSlides;

    return slideInterval;
  }

  /**
  * Function that redraws the slider UI.
  *
  * @param {string} direction - A string containing either "back" or "forward" for knowing direction
  * @param {Object} slideInteval - An object with indexes containing the active slide, the two slides before that and the two slides after that
  */
  function updateUI(direction, slideInterval) {
    const slideInt = slideInterval;

    // Hide all slides first
    for(let element of allSlides) {
      element.classList.add('hide');
    }

    // This is the same for both directions
    allSlides[slideInt.active].classList.remove('hide', 'active');

    if (direction === "back") {
      allSlides[slideInt.activeMinusTwo].classList.add('slideLeft');
      allSlides[slideInt.activeMinusOne].classList.remove('slideLeft', 'hide');
      allSlides[slideInt.activeMinusOne].classList.add('active');
      allSlides[slideInt.active].classList.add('slideRight');
      allSlides[slideInt.activePlusOne].classList.remove('slideRight');

      newActive = allSlides[slideInt.activeMinusOne];
    } else if (direction === "forward") {
      allSlides[slideInt.activeMinusOne].classList.remove('slideLeft');
      allSlides[slideInt.active].classList.add('slideLeft');
      allSlides[slideInt.activePlusOne].classList.add('active');
      allSlides[slideInt.activePlusOne].classList.remove('slideRight', 'hide');
      allSlides[slideInt.activePlusTwo].classList.add('slideRight');

      newActive = allSlides[slideInt.activePlusOne];
    }
  }

  /**
  * Callback function
  */
  function hideElement(e) {
      e.target.classList.add('hide');
      e.target.removeEventListener('transitionend', hideElement);
      clickable = true;

      // Fade in the overlay text if there is any
      if (newActive.querySelector('.wbn-overlay-text')) {
        newActive.querySelector('.wbn-overlay-text').classList.add('wbn-overlay-text-show');
      }

      // Fade back the text on the old active slide by checking if the slide has an overlay text
      if(e.target.querySelector('.wbn-overlay-text')) {
        e.target.querySelector('.wbn-overlay-text').classList.remove('wbn-overlay-text-show');
      }
    }

  //Event listeners
  forwardButton.addEventListener('click', () => { changeSlide('forward') });
  backButton.addEventListener('click', () => { changeSlide('back') });
});