function initOnBoard(isOnBoard) { // isOnBoard - опция показа
    let body = document.body;
    let html = document.documentElement;
    let scrollBarWidth = 0

    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0); // высота видимой страницы
    let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight); // общ. высота страницы

    if (height > vh) {
        scrollBarWidth = getScrollBarWidth(); // чтобы не прыгала ширина сайта при скрытии скролла 
    }

    const data = [
        {
            title: 'Вкладка "Мой портфель"', 
            text: `Ведите учет своих собственных инвестиций и отслеживайте доходность. 
                    Проверяйте и сравнивайте разные стратегии, следите за выбранными компаниями или криптовалютой. 
                    Все ваши инвестиции в одном месте. Легко и удобно`
        },
        {
            title: 'Вкладка "Советник"', 
            text: `Если вы хотите инвестировать, используя рекомендации советника BeatMarket, тогда эта вкладка для вас. 
                    BeatMarket Advisor поможет сгенерировать сбалансированный персональный портфель акций, проследит за выбранными 
                    компаниями и укажет, если стоит продать.`
        },
        {
            title: 'Вкладка "Подписка"', 
            text: `Здесь вы можете ознакомиться со всеми имеющимися тарифами и выбрать тот, который подойдет именно вам. 
                    Вся актуальная информация по подписке будет находится в этой вкладке`
        }
    ]

    if (isOnBoard) {
        const onboardMain = document.querySelector(".onboard");
        const overlay_container = onboardMain.querySelector(".onboard-container");
        const pagination = onboardMain.querySelectorAll(".onboard-content-info-pagination-item");
        const menus = onboardMain.querySelectorAll(".onboard-items li");

        const btn_next = onboardMain.querySelector(".onboard-content-info-buttons .next");
        const btn_prev = onboardMain.querySelector(".onboard-content-info-buttons .prev");
        const btn_close = document.querySelector(".onboard-content-info-buttons .close");

        const onboard_title = onboardMain.querySelector(".onboard-content-info-subtitle"); 
        const onboard_text = onboardMain.querySelector(".onboard-content-info-description"); 

        let active_id = 0; // базовое значение активного пункта

        document.querySelectorAll(".onboard_activate").forEach(item => { // ПОКАЗ ПО КЛИКУ НА НАСТРОЙКИ
            item.addEventListener("click", (e) => {
                e.preventDefault();
                showOnBoard();
            });
        });

        document.querySelectorAll("[data-onboardOpen]").forEach(item => { // ПОКАЗ ПО КЛИКУ НА НАСТРОЙКИ
            let id = +item.dataset.onboardopen;
            //console.log(id);
            item.addEventListener("click", (e) => {
                e.preventDefault();
                showOnBoardAdvisor(id);
            });
        });

        document.querySelectorAll(".onboard .close").forEach(item => {
            item.addEventListener("click", () => {
                closeOnBoard(active_id + 1);
            });
        });

        btn_next.addEventListener("click", (item) => {
            updateData(active_id + 1)
            active_id += 1;
        });

        btn_prev.addEventListener("click", (item) => {
            updateData(active_id - 1)
            active_id -= 1;
        });

        btn_close.addEventListener("click", (item) => {
            closeOnBoard(active_id + 1);
        });

        pagination.forEach((item) => {
            item.addEventListener("click", () => {
                const id = Number(item.dataset.id);
                updateData(id);
                active_id = id;
            });
        });

        function updateData(id) {

            if (id === data.length) {
                closeOnBoard(id);
                return;
            }

            if (id === 0) {
                btn_prev.classList.add("hidden");
            }

            if (id > 0) {
                btn_prev.classList.remove("hidden");
            }

            if (id === (data.length - 1)) {
                btn_next.innerHTML = "Закрыть";
            }
            else {
                btn_next.innerHTML = "Далее";
            }

            pagination[active_id].classList.remove("active");
            pagination[id].classList.add("active");

            menus[active_id].classList.remove("active");
            menus[id].classList.add("active");

            onboard_title.innerHTML = data[id].title;
            onboard_text.innerHTML = data[id].text;
        }

        function closeOnBoard(id) {
            overlay_container.classList.add("invisible");

            setTimeout(() => {
                if (!document.querySelector(".burger input[type='checkbox']").checked) {
                    body.classList.remove("hideScroll");
                }
                body.style.paddingRight = "";
                onboardMain.classList.remove("visible");
                overlay_container.classList.add("hidden");

                let onboardAdvisor = document.querySelectorAll(".onboard--advisor");
                onboardAdvisor.forEach(item => {
                    item.classList.remove("visible");
                    item.querySelector(".onboard-container").classList.add("hidden");
                });

            }, 150);

            setTimeout(() => {
                pagination[id-1].classList.remove("active");
                menus[id-1].classList.remove("active");

                pagination[0].classList.add("active");
                menus[0].classList.add("active");
                btn_next.innerHTML = "Далее";

                active_id = 0;
            }, 160);

        }

        function showOnBoard() {
            active_id = 0; // изначально у нас активный первый пункт
            btn_prev.classList.add("hidden"); // заодно убираем кнопку предыдущего пункта (так как у нас уже начальный)
    
            overlay_container.classList.remove("invisible");
            overlay_container.classList.remove("hidden");
    
            onboardMain.classList.add("visible");
            body.classList.add("hideScroll");
            body.style.paddingRight = `${scrollBarWidth}px`;
        }

        function showOnBoardAdvisor(id) {
            document.querySelector(`[data-onboard="${id}"]`).querySelector(".onboard-container").classList.remove("invisible");
            document.querySelector(`[data-onboard="${id}"]`).querySelector(".onboard-container").classList.remove("hidden");
    
            document.querySelector(`[data-onboard="${id}"]`).classList.add("visible");
            body.classList.add("hideScroll");
            body.style.paddingRight = `${scrollBarWidth}px`;
        }

    }

    function getScrollBarWidth() {
        const scrollBlock = document.createElement("div");
        scrollBlock.classList.add("scroll_block_dummy");
        document.body.appendChild(scrollBlock);

        const scrollBarWidth = scrollBlock.offsetWidth - scrollBlock.clientWidth;
        document.body.removeChild(scrollBlock);
        return scrollBarWidth;
    }

}

initOnBoard(true); // ЕСЛИ TRUE - ИНИЦИАЛИЗИРУЕМ, ИНАЧЕ НЕТ 