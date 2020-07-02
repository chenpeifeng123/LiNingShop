/* 监听页面的加载，等页面加载完再执行js代码 */
$(() => {

    // (1) 正则校验
    // (2) 事件处理(表单)
    /* 思路：给输入框添加事件(失去焦点)监听，当失去焦点的时候，应该获取输入框的内容进行正则校验 */
    $("#usernameID").blur(function() {
        // /* 要求：2~6位字母(区分大小写) */
        // let reg = /^[a-zA-Z]{2,6}$/;
        // let val = $.trim($(this).val());
        // if (reg.test(val)) {
        //     $(this).next().text("");
        //     $(this).parents(".form-item").removeClass("form-group-error");
        // } else {
        //     /* 设置span标签的内容 */
        //     $(this).next().text("用户名不符合规范！");
        //     /* 设置div标签的样式 */
        //     $(this).parents(".form-item").addClass("form-group-error");
        // }
    });

    $("#phoneID").blur(function() {
        /* 要求：11位数字，以1开头，第二位是3-9之间的数字  13926291888 */
        let reg = /^1[3-9]\d{9}$/;
        let val = $.trim($(this).val());
        if (reg.test(val)) {
            $(this).next().text("");
            $(this).parents(".form-item").removeClass("form-group-error");
        } else {
            /* 设置span标签的内容 */
            $(this).next().text("手机号码不符合规范！");
            /* 设置div标签的样式 */
            $(this).parents(".form-item").addClass("form-group-error");
        }
    });

    $("#passwordA").blur(function() {
        let reg = /^[a-zA-Z0-9]{3,6}$/;
        let val = $.trim($(this).val());
        if (reg.test(val)) {
            $(this).next().text("");
            $(this).parents(".form-item").removeClass("form-group-error");
        } else {
            /* 设置span标签的内容 */
            $(this).next().text("密码不符合规范！");
            /* 设置div标签的样式 */
            $(this).parents(".form-item").addClass("form-group-error");
        }
    });


    $("#passwordB").blur(function() {
        let val = $.trim($(this).val());
        if ($.trim($("#passwordA").val()) === val) {
            $(this).next().text("");
            $(this).parents(".form-item").removeClass("form-group-error");
        } else {
            /* 设置span标签的内容 */
            $(this).next().text("两次输入的密码不相同");
            /* 设置div标签的样式 */
            $(this).parents(".form-item").addClass("form-group-error");
        }
    });

    // (3) 图形验证码
    // (4) 注册功能(获取参数并且发送网络请求， 在服务器端进行处理)
    // (5) 设计数据库(表 - 字段)

})