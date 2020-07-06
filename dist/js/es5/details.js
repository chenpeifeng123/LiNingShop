import Step from "./../js/step.js";
import Magnifier from "./../js/magnifier.js";
export default class Details {
  good_id;
  obj;
  cate;
  constructor() {
    let ids = location.search.slice(7) % 5;
    if (ids === 0) ids = 5;
    ids = 1000 + ids;
    this.good_id = ids;
    this.cate = [];
    this.getAjaxData(ids);
    this.initStroge();
  }
  initStroge() {
    let s = localStorage.getItem("user");
    if (s) {
      s = JSON.parse(s);
      this.obj = s;

      if (Object.getOwnPropertyNames(s).length === 2) {
        this.obj.num = Number($(".inp").val());
        this.obj.srcIndex = 0;
        this.obj.liIndex = 0;
      }
    }
  }
  getAjaxData(ids) {
    let self = this;
    $.ajax({
      url: "./../../server/details.php",
      dataType: "json",
      data: "ids=" + ids,
      success(data) {
        self.createLeftImg(data[1]);
        self.createRightInfo(data[1]);
      }
    });
  }
  createLeftImg(data) {
    let imgLeft = JSON.parse(data.minSrc);
    // 大图片
    $(`
        <img  src=${imgLeft[0]} alt="李宁 LI-NING">
        <div class="moveBox"></div>
        `).appendTo(".maxImg");
    $("[alt*='LI']").data("srcList", imgLeft);
    // 小图片
    let minImg = imgLeft.map((item, i) => {
      // $(".hidImg").eq(i).css("background-size","200% 200%")
      return $(`<a href="javascript:void(0)">
            <img  src=${item} alt="">
            </a>`);
    });
    $(' <div class="hidImg"></div>').appendTo(".dbLeft");
    $(".hidImg").css("background", `url(${imgLeft[0]}) no-repeat`).css("background-size", "200% 200%");

    $(".maxImg").on("mouseenter", Magnifier.mouseHandler);
    $(".minImg").html(minImg).mouseover("img", Magnifier.mouseImg);
  }

  //   右边
  createRightInfo(data) {
    let srcs = JSON.parse(data.src);
    this.cate = ["S", "M", "L", "XL", "XXL", "3XL"];
    if (data.flag === "shoes") {
      this.cate = null;
      this.cate = [39, 39.5, 40, 41, 41.5, 42, 43, 43.5, 44, 45, 45.5, 46];
    }
    $(`
    <h3>${data.info}</h3>
    <i>此商品不支持用优惠券</i>
    <div class="priceBox">
        <span class="encode">商品编码：&emsp;AJDQ373-2</span>
        <span class="oldPrice">吊牌价：&emsp;&emsp;<b>￥${data.price * 1.2}</b></span>
        <span class="newPrice">销售价：&emsp;&emsp;<em>￥${data.price}</em></span>
    </div>
     <div class="selCol">
         <span>选择颜色：</span>
      
     </div>
     <div class="selRule">
         <span>选择尺码：</span>
         <ul class='ruleNum'>
            
         </ul>
     </div>
     <div class="buyNum">
         <span>我&ensp;要&ensp;买：</span>
         <button class="sub">-</button>
         <input class='inp' type="text" value=${data.num}>
         <button  class="add">+</button>
     </div>
     <div class="bns">
         <div></div>
         <div class="addCar"></div>
     </div>
    `).appendTo(".dbRight");
    srcs.map(item => {
      $(`<img src=${item}>`).appendTo(".selCol").click(this.clickChangeBc.bind(this));
    });

    $(".selCol>img").eq(this.obj.srcIndex).addClass("bRed");
    let lis = this.cate.map(item => `<li>${item}</li>`).join("");
    $(lis).appendTo(".ruleNum").eq(this.obj.liIndex).addClass("bRed");
    $(".ruleNum").click("li", this.clickChangeBc.bind(this));
    $(".addCar").click(this.clickGoodCar.bind(this));
    this.setStep();
    this.setStorage();
  }
  // 选择颜色和尺码
  clickChangeBc(e) {
    let target = $(e.target);
    let tn = e.target.nodeName;
    if (tn === "UL") return;
    if (tn === "IMG") {
      this.obj.srcIndex = target.index() - 1;
    } else {
      this.obj.liIndex = target.index();
    }
    localStorage.setItem("user", JSON.stringify(this.obj));
    target.addClass("bRed").siblings().removeClass("bRed");
  }

  //   设置商品数量
  setStep() {
    new Step($(".add"), $(".sub"), $(".inp"));
    $(".inp").on("getNum", (e, data) => {
      this.sendAjax(data);
      this.setStorage(data);
    });
  }
  //   将商品数量存入数据库
  sendAjax(num) {
    let self = this;
    $.ajax({
      url: "./../../server/addNum.php",
      data: "ids=" + self.good_id + "&num=" + num
    });
  }
  //   存储商品数量到本地
  setStorage(num) {
    this.obj.num = num || Number($(".inp").val());
    localStorage.setItem("user", JSON.stringify(this.obj));
  }
  clickGoodCar() {
    let o = {};
    o.user = this.obj.user;
    o.liIndex = this.cate[this.obj.liIndex];
    o.num = this.obj.num;
    o.good_id = this.good_id;
    console.log(o);
    if (!o.user) {
      alert("未登录,跳转登录页面");
      location.href = "./../pages/signIn.html";
      return;
    }
    // post请求需要设置请求头
    $.ajax({
      url: "./../../server/addCart.php",
      data: o,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success(res) {

        if (!res) {
          alert("加入购物车成功");
          location.reload();
        } else {
          alert("加入购物车失败！");
        }
      }
    });
  }
}