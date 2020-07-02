$(() => {

    /* 给登录按钮添加点击事件 */
    $("#loginBtn").click(function() {
        let username = $.trim($("#usernameID").val());
        let password = $.trim($("#passwordID").val());

        $.ajax({
            type: "post",
            url: "../server/login.php",
            data: { username, password },
            dataType: "json",
        }).done(data => {
            console.log(data);
            if (data.status == "success") {
                /* ..登录成功.. */
                /* (1) 要把用户的id和名字保存起来 */
                localStorage.setItem("user_id", data.data.userId);
                localStorage.setItem("user_name", data.data.username);

                /* (2) 跳转回列表页 */
                location.href = "./list.html";
            } else {
                alert(data.data.msg);
            }
        })

    })
})