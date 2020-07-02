$(() => {
    /* 1、发送网络请求获取服务器端的数据 */
    $.ajax({
        url: "../server/getList.php",
        dataType: "json",
    }).done(data => {
        let html = data.map(item => {
            return `
                <li class="item" data-id=${item.good_id}>
                            <div class="item-box">
                                <img src=${item.src}>
                                <div class="price ">${item.price}</div>
                                <div class="title ">${item.title.slice(0,15)}</div>
                                <div class="dis ">${item.disCount}</div>
                                <div class="storeName ">${item.shopName}</div>
                            </div>
                          <div class="addCart">加入购物车</div>
                        </li>
                `
        }).join("");
        $(".box-list").html(html);


    })

    /* 2、加入购物车的点击事件 */
    $(".box-list").on("click", ".addCart", function() {
        console.log("++")
            /* user_id user_name */
        let user_id = localStorage.getItem("user_id") || "";
        let user_name = localStorage.getItem("user_name") || "";
        let good_id = $(this).parent().attr("data-id");

        console.log(user_id, user_name);
        if (user_id && user_name) {
            /* 发请求，执行添加到购物车 */
            $.ajax({
                url: "../server/addCart.php",
                data: { user_id, good_id }
            }).done(data => {
                console.log("返回值:", data);
            })

        } else {
            /* 跳转去登录 */
            location.href = "./login.html"
        }
    })

    /* 3、点击按钮的时候加入购物车 */
    $("#cart").click(function() {
        location.href = "./cart.html"
    })
})