import { moveInstrumentation } from '../../scripts/scripts.js';
export default function decorate(block) {
    let globalNetworkCont = [];
    const div = document.createElement('div');
    //moveInstrumentation(block, div);
    div.classList.add('region');

    // Process each row in the block
    [...block.children].forEach((row, rowIndex) => {
        if (rowIndex === 0) {
            // On the first row, collect children of paragraph elements
            [...row.children].forEach((p) => {
                globalNetworkCont = [...p.children];
            });
        } else {
            // For other rows, find anchor tags and modify them
            const a = row.querySelector('a');
            //moveInstrumentation(row, a);
            if (a) {
                // Create and append a span to the anchor
                const span = document.createElement('span');
                //moveInstrumentation(a, span);
                //const paragraph = document.createElement('p');
                span.classList.add('icon', 'ups-icon-right-arrow');
                a.append(span);
                //paragraph.append(a);
                // Append the modified anchor to the div
                moveInstrumentation(a, div);
                div.append(a);
                
                // Remove the processed row
                row.replaceWith('');
            }
        }
    });
    // Insert the div after the second item in globalNetworkCont
    globalNetworkCont.forEach((row, index)=>{
        if(index==1){
            row.classList.add('gnb-desc');
            //moveInstrumentation(row, div);
            row.insertAdjacentElement('afterend', div);
        }
        if(globalNetworkCont.length-1 === index){
            row.classList.add('gnb-efmap');
        }
    })


}