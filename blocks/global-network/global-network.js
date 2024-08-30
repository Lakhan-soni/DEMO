
export default function decorate(block) {
    let global_network_cont = [];
    [...block.children].forEach((row, rowIndex) => {
        if(rowIndex == 0){
        [...row.children].forEach((p)=>{
            global_network_cont = [...p.children];
        })
    }
    });

    global_network_cont.forEach((row, index)=>{
        if(index==1){
            row.classList.add('gnb-desc');
        }
    })


}