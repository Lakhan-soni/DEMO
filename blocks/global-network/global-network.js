// import { moveInstrumentation } from '../../scripts/scripts.js';
// export default function decorate(block) {
//     let globalNetworkCont = [];
//     const div = document.createElement('div');
//    // moveInstrumentation(block, div);
//     div.classList.add('region');

//     // Process each row in the block
//     [...block.children].forEach((row, rowIndex) => {
//         if (rowIndex === 0) {
//             // On the first row, collect children of paragraph elements
//             [...row.children].forEach((p) => {
//                 globalNetworkCont = [...p.children];
//             });
//         } else {
//             // For other rows, find anchor tags and modify them
//             const a = row.querySelector('a');
//             moveInstrumentation(row, a);
//             if (a) {
//                 // Create and append a span to the anchor
//                 const span = document.createElement('span');
//                 moveInstrumentation(a, span);
//                 //const paragraph = document.createElement('p');
//                 span.classList.add('icon', 'ups-icon-right-arrow');
//                 a.append(span);
//                 //paragraph.append(a);
//                 // Append the modified anchor to the div
//                 //moveInstrumentation(div, a);
//                 div.append(a);
                
//                 // Remove the processed row
//                 row.replaceWith('');
//             }
//         }
//     });
//     // Insert the div after the second item in globalNetworkCont
//     globalNetworkCont.forEach((row, index)=>{
//         moveInstrumentation(row, row);
//         if(index==1){
//             row.classList.add('gnb-desc');
//             moveInstrumentation(row, div);
//             row.insertAdjacentElement('afterend', div);
//         }
//         if(globalNetworkCont.length-1 === index){
//             row.classList.add('gnb-efmap');
//         }
        
//     })


// }



import { moveInstrumentation } from '../../scripts/scripts.js';

// Function to process and modify anchor elements
function processAnchor(anchor, containerDiv) {
    if (!anchor) return;

    // Create and append a span to the anchor
    const span = document.createElement('span');
    span.classList.add('icon', 'ups-icon-right-arrow');
    moveInstrumentation(anchor, span);
    anchor.append(span);

    // Append the modified anchor to the container div
    containerDiv.append(anchor);
}

function processFirstRow(row) {
    // Collect children of paragraph elements in the first row
    return [...row.children].flatMap(p => [...p.children]);
}

function processRemainingRows(rows, containerDiv) {
    rows.forEach(row => {
        const anchor = row.querySelector('a');
        moveInstrumentation(row, anchor);
        processAnchor(anchor, containerDiv);

        // Remove the processed row
        row.replaceWith('');
    });
}

function insertContainerDivAfterSecondItem(containerDiv, items) {
    if (items.length > 1) {
        items[1].classList.add('gnb-desc');
        moveInstrumentation(items[1], containerDiv);
        items[1].insertAdjacentElement('afterend', containerDiv);
    }
}

function addFinalClassToLastItem(items) {
    if (items.length > 0) {
        items[items.length - 1].classList.add('gnb-efmap');
    }
}

export default function decorate(block) {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('region');

    const rows = [...block.children];
    if (rows.length === 0) return;

    // Process the first row to gather global network content
    const globalNetworkCont = processFirstRow(rows[0]);

    // Process remaining rows
    processRemainingRows(rows.slice(1), containerDiv);

    // Insert the div after the second item in globalNetworkCont
    insertContainerDivAfterSecondItem(containerDiv, globalNetworkCont);

    // Add the final class to the last item
    addFinalClassToLastItem(globalNetworkCont);
}