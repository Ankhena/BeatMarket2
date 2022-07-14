function initMoveStrategy() {
    let moveActive = false;
    let strategies = document.querySelectorAll(".myStrategy-items-item");

    $(".myStrategy-items").sortable();
    $(".myStrategy-items").disableSelection();
    $(".myStrategy-items").sortable("disable");

    document.querySelectorAll(".myStrategy-header button").forEach(item => {
        item.addEventListener("click", (e) => {
            item.classList.toggle("active");
            moveActive = !moveActive;

            if (moveActive) {
                $(".myStrategy-items").sortable("enable");
                item.children[1].innerHTML = "Сохранить порядок";
            }
            else {
                $(".myStrategy-items").sortable("disable");
                item.children[1].innerHTML = "Изменить порядок";
            }

            strategies.forEach(item => {
                item.classList.toggle("move");
            });

        });
    });
}

initMoveStrategy();