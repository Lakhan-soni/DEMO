import { createKeyLine } from '../../scripts/scripts.js';

export default function decorate(block) {
    // Add key lines to all <h2> elements
    block.querySelectorAll('h2').forEach(createKeyLine);

    // Add a class to the first <p> element
    const paragraphs = block.querySelectorAll('p');
    if (paragraphs.length > 0) {
        paragraphs[0].classList.add('global-network-description');
    }

    // Add classes to each .button-container element
    const buttons = block.querySelectorAll('.button-container');
    buttons.forEach((button, index) => {
        if (index < buttons.length - 1) {
            button.classList.add('region-btn');
        } else {
            button.classList.add('exp-facility-map-btn');
        }
    });
}
