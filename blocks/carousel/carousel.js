export default function decorate(block) {
    // Extract all rows (children of the block)
    const rows = Array.from(block.children);
    let intervalTime = 3000; // Default interval time
  
    // Create slide wrapper and buttons container
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('carousel-slide');
    const buttonCont = document.createElement('div');
    buttonCont.classList.add('carousel-buttons');
  
    // Create buttons
    const buttons = {
      previous: createButton('btn btn-prvs', '\u{003C}'),
      play: createButton('btn btn-play', '\u{25B6}'), // '▶' for play button
      dot: [],
      next: createButton('btn btn-next', '\u{003E}')
    };
  
    // Helper function to create buttons
    function createButton(classes, text) {
      const button = document.createElement('button');
      button.className = classes;
      button.textContent = text;
      return button;
    }
  
    // Process rows to setup slides and interval
    rows.forEach((row, index) => {
      if (index === 1) {
        intervalTime = parseInt(row.innerText, 10); // Parse interval time
        row.remove();
      } else if (index > 1) {
        row.classList.add('slide');
        Array.from(row.children).forEach((col, colIndex) => {
          if (colIndex === 1) {
            col.classList.add('slide-text');
          }
        });
        slideDiv.appendChild(row);
        if (index >= 2) {
          buttons.dot.push(createButton('btn btn-dot', '•')); // Using '•' for dots
        }
      }
    });
  
    // Append buttons to container
    buttonCont.appendChild(buttons.previous);
    buttonCont.appendChild(buttons.play);
    buttons.dot.forEach(dot => buttonCont.appendChild(dot));
    buttonCont.appendChild(buttons.next);
  
    // Append slide wrapper and buttons container to the block
    block.appendChild(slideDiv);
    block.appendChild(buttonCont);
  
    // Set initial position for slides
    const slides = Array.from(document.querySelectorAll('.slide'));
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${index * 100}%)`;
    });
  
    // Carousel navigation
    let curSlide = 0;
    const maxSlide = slides.length - 1;
    let slideInterval = null; // To store interval reference
  
    function updateSlidePosition() {
      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
      });
  
      // Update dot indicators
      buttons.dot.forEach((dot, index) => {
        dot.classList.toggle('active', index === curSlide);
      });
    }
  
    function startInterval() {
      slideInterval = setInterval(() => {
        curSlide = (curSlide === maxSlide) ? 0 : curSlide + 1;
        updateSlidePosition();
      }, intervalTime);
      buttons.play.textContent = '\u{23F8}'; // Change to pause symbol
    }
  
    function stopInterval() {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
        buttons.play.textContent = '\u{25B6}'; // Change to play symbol
      }
    }
  
    // Event listeners for buttons
    buttons.next.addEventListener('click', () => {
      stopInterval(); // Stop interval on manual navigation
      curSlide = (curSlide === maxSlide) ? 0 : curSlide + 1;
      updateSlidePosition();
    });
  
    buttons.previous.addEventListener('click', () => {
      stopInterval(); // Stop interval on manual navigation
      curSlide = (curSlide === 0) ? maxSlide : curSlide - 1;
      updateSlidePosition();
    });
  
    buttons.play.addEventListener('click', () => {
      if (slideInterval) {
        stopInterval();
      } else {
        startInterval();
      }
    });
  
    // Add event listeners to dots
    buttons.dot.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopInterval(); // Stop interval on dot navigation
        curSlide = index;
        updateSlidePosition();
      });
    });
  
    // Initialize paused state
    stopInterval(); // Ensure carousel starts in a paused state
  }
  