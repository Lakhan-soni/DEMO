export default function decorate(block) {
  // Extract all rows (children of the block)
  const rows = Array.from(block.children);
  let intervalTime = 0;

  // Add 'slide' class and handle content for slides
  rows.forEach((row, index) => {
      if (index === 2) {
          intervalTime = parseInt(row.innerText, 10); // Parse interval time
      } else if (index > 2) {
          row.classList.add('slide');
          Array.from(row.children).forEach((col, colIndex) => {
              if (colIndex === 1) {
                  col.classList.add('slide-text');
              }
          });
      }
  });

  // Create and append previous button
  const previousBtn = document.createElement('button');
  previousBtn.classList.add('btn', 'btn-prvs');
  previousBtn.textContent = 'prev';
  block.append(previousBtn);

  // Create and append next button
  const nextBtn = document.createElement('button');
  nextBtn.classList.add('btn', 'btn-next');
  nextBtn.textContent = 'next';
  block.append(nextBtn);

  // Create a wrapper for slides
  const slideDiv = document.createElement('div');
  slideDiv.classList.add('carousel-slide');
  
  // Append slides to the new wrapper
  const slides = document.querySelectorAll('.slide');
  slides.forEach(slide => slideDiv.appendChild(slide));
  
  // Replace all slide elements with the new wrapper
  block.insertBefore(slideDiv, nextBtn);

  // Set initial position for slides
  slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${index * 100}%)`;
  });

  // Carousel navigation
  let curSlide = 0;
  const maxSlide = slides.length - 1;

  // Next slide button event
  nextBtn.addEventListener('click', () => {
      curSlide = (curSlide === maxSlide) ? 0 : curSlide + 1;
      updateSlidePosition();
  });

  // Previous slide button event
  previousBtn.addEventListener('click', () => {
      curSlide = (curSlide === 0) ? maxSlide : curSlide - 1;
      updateSlidePosition();
  });

  // Update slide positions based on the current slide
  function updateSlidePosition() {
      slides.forEach((slide, index) => {
          slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
      });
  }
}
