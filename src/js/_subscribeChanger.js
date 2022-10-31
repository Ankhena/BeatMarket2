function initSubscribeChanger() {
    let toggler = document.querySelector(".subscribe-changer input[type='checkbox']");

    if (toggler !== null) {
        let costsBlock = document.querySelectorAll(".costSwitcher");
        let togglerDescr = document.querySelectorAll(".checkbox-toggle__descr");
    
        let subscribeCosts = [["290 руб.", "690 руб.", "890 руб."], ["1290 руб.", "2690 руб.", "3290 руб."]];
        let subscribeNames = ["/ месяц", "/ год"];
    
    
        toggler.addEventListener("change", function() {
            togglerDescr.forEach((item, i) => {
                item.classList.toggle("checkbox-toggle__descr--light");
            });
    
            costsBlock.forEach((item, i) => {
                item.querySelector("p strong").innerHTML = subscribeCosts[+toggler.checked][i];
                item.querySelector("p span").innerHTML = subscribeNames[+toggler.checked];
                item.querySelector(".btnShowAll").classList.toggle("btnShowAll--disabled");
            });
        });
    }
}

initSubscribeChanger();