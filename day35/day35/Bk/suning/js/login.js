$(() => {
    $("#loginBtn").click(function() {

        var username = $("#usernameID").val();
        var password = $("#passwordID").val();

        $.ajax({
            type: "post",
            url: "../server/login.php",
            data: { username, password },
            dataType: "json",
            success: function(response) {
                console.log(response);
                /* 检查结果：成功 ？失败 */
                // {status:"ok",data:{msg:"登录成功"}}
                if (response.status == "success") {
                    /* 存储登录数据到本地 */
                    localStorage.username = username;
                    localStorage.id = response.data.userId;
                    console.log(response);

                    window.location.href = "./list.html";
                } else {
                    alert(response.data.msg);
                }
            }
        });
    })
})