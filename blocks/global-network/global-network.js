
import { createKeyLine } from '../../scripts/scripts.js';
export default function decorate(block) {
block.querySelectorAll('h2').forEach(createKeyLine);
block.querySelectorAll('p')[0].classList.add('global-network-description');
block.querySelectorAll('.button-container').forEach((button, index) => {
    if(index < block.querySelectorAll('.button-container').length-1){
        button.classList.add('region-btn');
    }else{
        button.classList.add('exp-facility-map-btn');
    }
});

}