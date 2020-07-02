$(() => {
    /* 登录状态的处理 */
    /* 检查本地是否保存user_id和user_name的值，如果本地有，那么表示当前是登录状态 */
    /* 如果没有，那么表示当前是未登录的状态 */
    let user_id = localStorage.getItem("user_id") || "";
    let user_name = localStorage.getItem("user_name") || "";
    console.log(user_id, user_name);
    if (user_id && user_name) {
        $(".userInfo").text(`${user_name}:欢迎您`);
        $(".status").text("注销");
    } else {
        $(".userInfo").text(`匿名用户:欢迎您`);
        $(".status").text("登录");
    }

    $(".status").click(function() {
        if ($(this).text() == "登录") {
            location.href = "./login.html";
        } else {
            localStorage.removeItem("user_id")
            localStorage.removeItem("user_name");
            /* 重新加载 */
            window.location.reload();
        }

    })


    /* 发请求获取购物车的商品信息 */
    $.ajax({
        url: "../server/getCart.php",
        data: { user_id },
        dataType: "json"
    }).done(data => {
        data = dataTool(data);
    })

    // [
    //     { store: "张大娘的店铺" ,goods:[],
    //     { store: "李大爷的店铺" },
    //     { store: "皮皮虾" }
    // ]


    function dataTool(data) {
        let arr = [];
        data.forEach(item => {
            let result = arr.filter((ele) => ele.store == item.shopName);
            if (result.length == 0) {
                arr.push({ store: item.shopName, goods: [] });
            }
        })

        /* 把所有的数据依次加入到对象中去 */
        data.forEach(item => {
            arr.forEach(ele => {
                if (ele.store == item.shopName) {
                    ele.goods.push(item);
                }
            })
        })
        return arr;
    }
})