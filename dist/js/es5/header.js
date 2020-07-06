$(function () {
    (function () {
        let data = JSON.parse(localStorage.getItem('user'));

        if (!data || !data.user) return;
        $('.welcome>a').text(data.user + "，欢迎您");
        $('.logOff').addClass('cloak_on').nextUntil('.goodCart').addClass('cloak_off');
        $('.logOff>a').click(function () {
            localStorage.clear();
            location.reload();
        });
        $("h1").click(function () {
            window.open("./../index.html");
        });

        $.ajax({
            url: "../../server/getCartShop.php",
            data,
            type: "post",
            success(res) {
                $(".cartCount").text(`( ${res ? JSON.parse(res).length : 0} )`);
                setShopList(JSON.parse(res));
                cloak(JSON.parse(res));
                $(".cartCount,.goodCart,.minCar").hover(mouseShowShop);
            }
        });

        function mouseShowShop(e) {
            let target = $(e.target);
            $(".minCar").toggle();
        }
        function setShopList(data) {
            let countPrice = 0;
            let divs = data.map(function (item) {

                let as = `<a href="./details.html?id=${item.id}">
                <img src="${JSON.parse(item.src)[0]}" alt="">
                <div class="mcText">
                    <span class=mcTitle>${item.info}</span>
                    <span class="mcPrice">
                        <i>￥ ${item.price}</i>
                        <em>× ${item.num}</em>
                        <b>${item.rule}</>
                    </span>
                </div>
            </a>`;
                countPrice += item.num * item.price;
                return as;
            }).join("");

            $(divs).appendTo(".minCar");
            $(`
            <div class='totalPrice'>
                <div class='totalNum'>
                <span>
                    <em>${data.length}</em>
                    件总计：
                    <i><u>￥</u>${countPrice}</i>
                </span>
                </div>
                <a class="goCart" href="./goodCar.html" target="_blank">
                前往购物车
                </a>    
            </div>
        `).appendTo(".minCar");
            $(".minCar").hide();
        }
        function cloak(data) {
            if (data.length === 0) {
                $(".clock").removeClass("cloak_off").css("font-size", "12px");
                $(".totalPrice").addClass("cloak_off");
            }
        }
    })();
});