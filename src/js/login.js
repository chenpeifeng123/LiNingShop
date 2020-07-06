
export default class Login {
  ids;
  focusFn;
  vCode;
  constructor(iden) {
    
    this.iden = iden;
    this.judge();
    $(".signInBn").click(this.clickSubmit.bind(this));
    this.vCode = new GVerify("cas");
  }

  judge() {
    //   聚焦显示文字
    this.focusFn = (e) => this.focusHandler(e);
    $(".form").on("focus", "input", this.focusFn);
    if (this.ids) return;
    $(".form").on("input", "input", (e) => {
      this.ids = setTimeout(() => {
        clearTimeout(this.ids);
        this.ids = 0;
        let target = $(e.target);
        let bool = this.testVerify(target);
        if (!bool) {
          target
            .addClass("inpSuccess")
            .removeClass("inpFail")
            .next()
            .text("× 格式错误")
            .css("color", "#f33");
        } else {
          target
            .addClass("inpFail")
            .removeClass("inpSuccess")
            .next("span")
            .text("√ 格式正确")
            .css("color", "green");
        }
        // let index = Array.from($("input")).indexOf(e.target);
        // this.list[index] = bool;
      }, 300);
    });
  }
  testVerify(elem) {
    switch (elem.attr("id")) {
      case "user":
        return /^[\w\u4e00-\u9fa5]{4,16}$/.test(elem.val());
      case "pwd":
        return /^(?=\D+\d)[A-Za-z\d]{6,16}/.test(elem.val());
      case "email":
        return /^\w+\@\w+\.\w+/.test(elem.val());
      case "vCode":
        return (
          elem.val().toLowerCase() === this.vCode.options.code.toLowerCase()
        );
      case "repeatPwd":
        return $("#pwd").val() ? $("#pwd").val() === elem.val() : false;
    }
  }
  //   随机验证码

  focusHandler(e) {
    let target = $(e.target);
    target.next("span").css("display", "block");
    $(".form").off("focus", this.focusHandler);
  }
  clickSubmit() {
    let num = this.iden ? 3 : 5;
    let self = this;
    if ($(".inpSuccess").length !== 0 || $(".inpFail").length !== num) {
      alert("请完善信息");
      return;
    }
     let o=Array.from($('input')).reduce((value,item)=>{
        if (item.id!== "vCode") value[item.id]=item.value;
        return value;
      },{})
    //  加密
      o.pwd= md5($("#pwd").val()).substr(0,10)
  
    $.ajax({
      url: "./../../server/login.php?type=" + this.iden,
      data: o,
      type:'post',
      success: function (s) {
        s = JSON.parse(s);
        alert(s.msg);
        $("#verifyCanvas").trigger("click")
        if(s.status !== "error") self.changeStatus({"user":o.user});
      }
    });
  }
  changeStatus(data) {
      let href = "signIn.html";
      if (this.iden) {
        href = "../index.html";
        localStorage.removeItem('user');
        localStorage.setItem('user',JSON.stringify(data));
      }
      location.href = href;
    
    
  }
}
