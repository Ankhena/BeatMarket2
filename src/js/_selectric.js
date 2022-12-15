// link: https://selectric.js.org

function initSelectric() {
    document.querySelectorAll("select").forEach(item => {
        $(item).selectric(
					{
						disableOnMobile: false,
						nativeOnMobile: false,
					}
				);
    });
}

initSelectric();