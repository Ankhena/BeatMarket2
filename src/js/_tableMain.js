function initTableMain() {
    let commentTableText = document.querySelectorAll(".modal-content-simpleText");

    document.querySelectorAll(".statTable__content").forEach(item => {
        if (document.body.offsetWidth <= 768) {
            let statSticker = item.querySelector(".statSticker");
            if (statSticker !== null) {
                statSticker.addEventListener("click", (e) => {
                    item.classList.toggle("statTable__content--opened");
                    e.stopPropagation();
                });
            }
        }
        else {
            item.addEventListener("click", (e) => {
                item.classList.toggle("statTable__content--opened");
                e.stopPropagation();
            });
        }
    });

    document.querySelectorAll(".statTable__item--comment").forEach(item => {
        item.addEventListener("click", (e) => {
            let text = item.querySelector(".statTable__value").innerHTML;
            if (commentTableText.length > 0) {
                commentTableText[0].innerHTML = text;
            }
            e.stopPropagation();
        });
    });
}

initTableMain();