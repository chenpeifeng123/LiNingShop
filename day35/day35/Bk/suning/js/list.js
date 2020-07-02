$(() => {

    getDataWithPage(1, 0);

    function getDataWithPage(page, type) {
        $.ajax({
            type: "get",
            url: "../server/getGoodsData.php",
            data: `page=${page}&sortType=${type}`,
            dataType: "json",
            success: (data) => renderUI(data)
        });
    }

    function renderUI(data) {
        let html = data.map((ele) => {
            return `
                <li class="item" data-id=${ele.good_id}>
                    <div class="item-box">
                        <img src=${ele.src}>
                        <div class="price ">￥ ${ele.price}</div>
                        <div class="title ">${ele.title.substr(0,15)}</div>
                        <div class="dis ">${ele.disCount}</div>
                        <div class="storeName ">${ele.shopName}</div>
                    </div>
                   <div class="addCart">加入购物车</div>
                </li>
            `
        }).join("");
        $(".box-list").html(html);
    }

    /* 实现点击添加商品到购物车的功能 */
    $(".box-list").on("click", ".addCart", function() {
        /* 检查是否已经登录 ，如果没有登录那就跳转到登录页面*/
        if (!localStorage.username) {
            window.location.href = "./login.html";
        }

        /* 获取当前商品的ID */
        let good_id = $(this).parents("li").data().id;
        /* 发送网络请求把当前数据添加到购物车表中 */
        /* 数据库表 cart_id  good_id  num isChecked */
        /* 添加数据： */
        /* 删除数据： */
        /* 更新数据： */
        $.ajax({
            url: "../server/cart.php",
            data: { type: "add", good_id: good_id, id: localStorage.id },
            dataType: "json",
            success: function(response) {
                if (response.status == "success") {
                    $(".cart_total").text($(".cart_total").text() * 1 + 1);
                }
            }
        });
    })

    /* 发请求获取购物车中商品的数量 */
    /* 检查登录状态，如果已经登录那么就请求获取购物车的数量 */
    if (localStorage.id) {
        $.ajax({
            url: "../server/getTotalCount.php",
            data: {
                id: localStorage.id
            },
            dataType: "json",
            success: function({ total }) {
                // console.log(total);
                $(".cart_total").text(total);
            }
        });
    }

    /* 打开购物车页面 */
    $(".cart").click(() => window.location.href = "./cart.html");
})