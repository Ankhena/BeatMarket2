function initSearchInput() {
    document.querySelectorAll(".mySearchContainer").forEach(item => {

        item.addEventListener("input", (e) => {
            let input, filter, a, i;
            input = document.querySelector(".mySearchInput");
            filter = input.value.toUpperCase();
            div = document.querySelector(".mySearchContainer");
            a = div.getElementsByTagName("div");
            for (i = 0; i < a.length; i++) {
                txtValue = a[i].textContent || a[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    a[i].style.display = "";
                } else {
                    if (!a[i].classList.contains("add")) {
                        a[i].style.display = "none";
                    }
                }
            }
        });
    
    });

    let breadcrumbs = []; // тут будут хранится объекты для breadcrumb

    function renderBreadcrumbs(breadcrumbsData) {
        const breadcrumbsContainer = document.querySelector(".breadcrumbs");
        if (breadcrumbsContainer !== null) {
            breadcrumbsContainer.innerHTML = ""; // очищаем все внутренние ноды

            breadcrumbsData.forEach((item, i) => { // и по дате загружаем новые
                let breadcrumb = document.createElement("div");
                breadcrumb.classList.add("breadcrumb");
                breadcrumb.setAttribute("data-id", i);
    
                let breadcrumb_name = document.createElement("strong");
                breadcrumb_name.innerHTML = item.name;
    
                let breadcrumb_org = document.createElement("span");
                breadcrumb_org.innerHTML = item.org;
    
                breadcrumb.appendChild(breadcrumb_name);
                breadcrumb.appendChild(breadcrumb_org);

                // добавление popup

                let popup = document.createElement("div");
                popup.classList.add("breadcrumb-popup");

                let popup_link = document.createElement("span");
                popup_link.classList.add("breadcrumb-popup__link");
                popup_link.innerHTML = "Редактирование транзакций";
                popup_link.setAttribute("data-modal", "modal_add");
                popup.appendChild(popup_link);

                let popup_link_delete = document.createElement("span");
                popup_link_delete.classList.add("breadcrumb-popup__link");
                popup_link_delete.classList.add("breadcrumb-popup__link--delete");
                popup_link_delete.innerHTML = "Удалить компанию";
                popup.appendChild(popup_link_delete);

                breadcrumb.appendChild(popup);
    
                breadcrumbsContainer.appendChild(breadcrumb);

                popup_link_delete.addEventListener("click", function(e) {
                    let id = breadcrumb.getAttribute("data-id"); // при клике получаем id breadcrumb
                    breadcrumbs.splice(id, 1); // удаляем из массива объект с необходимым breadcrmb
                    renderBreadcrumbs(breadcrumbs); // перерисовываем
                });
    
                breadcrumb.addEventListener("click", function(e) {
                    breadcrumb.querySelector(".breadcrumb-popup").classList.toggle("visible");
                });

                initModal(popup_link); // инициализируем модалку именно на этот узел
    
            });
        }
    }

    document.querySelectorAll(".input_search-container > div").forEach(item => {

        item.addEventListener("mousedown", () => {
            let name = item.querySelector(".content strong").innerHTML;
            let org = item.querySelector(".content span").innerHTML;

            breadcrumbs.push({name, org}); // добавили в массив новый объект с выбранными данными
            renderBreadcrumbs(breadcrumbs); // перерисовали

        });
    });
    
    document.querySelectorAll(".mySearchInput").forEach(item => {
        myContainer = document.querySelector(".input_search-container");
    
        item.addEventListener("focus", (e) => {
            myContainer.classList.add("visible");
        });
    
        item.addEventListener("blur", (event) => {
            myContainer.classList.remove("visible");
        });
    });

    renderBreadcrumbs(breadcrumbs);
}

initSearchInput()