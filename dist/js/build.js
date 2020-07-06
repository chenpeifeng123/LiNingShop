export default class backTop {
  bool;
  ids;
  doc;
  constructor(win, doc, info) {
    this.ids = setInterval(this.backTop.bind(this), 16);
    this.doc = doc;
    this.win = win;
    this.info = info;
    this.init();
    $("#backTop").css({
      zIndex:999
    });
  }
  init() {
    this.doc.find("a:last").click(this.clickHandler.bind(this));
    this.win.scroll(this.scrollHandler.bind(this));
    $(".heads").css({
      width: "100%",
      height: "90px",
      background: " transparent",
      position: "fixed",
      top: 0,
      zIndex: 999,
    });
    $("#backTop").css({
      position: "fixed",
      right: 0,
      top: 0,
      color: "#000",
      userSelect: "none",
      height: "100%",
    });
    this.doc.find(".hideTag").click((e) => this.clickHide(e));
    this.doc.find(".toggleLogo").click((e) => this.clickShow(e));
    this.ajax();
    let header = $($(".enter")[0].contentDocument);
    $(".heads").mouseenter(this.mouseHandler);
    header.find("#header").mouseleave(this.mouseHandler);
  }
  // 监听滚轮事件函数
  scrollHandler() {
    if (this.win.scrollTop() >= this.win[0].outerHeight / 2) {
      this.doc.find("a:last").css("visibility", "visible");      
    } else {
      this.doc.find("a:last").css("visibility", "hidden");
    }
  }
  //  监听返回按钮点击事件函数
  clickHandler() {
    this.bool = !this.bool;
  }
  // 点击后滚动条滑动
  backTop() {
    if (!this.bool) return;
    let top = this.win.scrollTop();
    top -= 100;
    this.win.scrollTop(top);
    if (this.win.scrollTop() <= 0) this.bool = false;
  }
  // 点击隐藏显示
  clickHide(e) {
    this.doc.find("#backTop").hide();
    this.doc.find(".toggleLogo").show(200);
  }
  clickShow(e) {
    this.doc.find("#backTop").show();
    this.doc.find(".toggleLogo").hide();
  }
  ajax() {
    let self = this;
    let data = JSON.parse(localStorage.getItem("user"));
    let url = "../../server/getCartShop.php";
    if (this.info) url = "../server/getCartShop.php";
    $.ajax({
      url,
      data,
      type: "post",
      success(res) {
        self.doc.find(".gcarNum span").text(res ? JSON.parse(res).length : 0);
      },
    });
  }
  mouseHandler(e) {
    if (e.type === "mouseenter") {
     
      
      $(".enter").css({
        pointerEvents: "auto",
        
      });
    }else if((e.type === "mouseleave")){
     
      $(".enter").css({
        pointerEvents: "none",
      });
    }
   
  }
}

!(function(window, document) {
	function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
		this.options = { //默认options参数值
			id: "", //容器Id
			canvasId: "verifyCanvas", //canvas的ID
			width: "100", //默认canvas宽度
			height: "30", //默认canvas高度
			type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
			code: ""
		}
		
		if(Object.prototype.toString.call(options) == "[object Object]"){//判断传入参数类型
			for(var i in options) { //根据传入的参数，修改默认参数值
				this.options[i] = options[i];
			}
		}else{
			this.options.id = options;
		}
		
		this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
		this.options.letterArr = getAllLetter();

		this._init();
		this.refresh();
	}

	GVerify.prototype = {
		/**版本号**/
		version: '1.0.0',
		
		/**初始化方法**/
		_init: function() {
			var con = document.getElementById(this.options.id);
			var canvas = document.createElement("canvas");
			this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
			this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
			canvas.id = this.options.canvasId;
			canvas.width = this.options.width;
			canvas.height = this.options.height;
			canvas.style.cursor = "pointer";
			canvas.innerHTML = "您的浏览器版本不支持canvas";
			con.appendChild(canvas);
			var parent = this;
			canvas.onclick = function(){
				parent.refresh();
				$("#vCode").trigger("input");
			}
		},
		
		/**生成验证码**/
		refresh: function() {
			this.options.code = "";
			var canvas = document.getElementById(this.options.canvasId);
			if(canvas.getContext) {
				var ctx = canvas.getContext('2d');
			}else{
				return;
			}
			
			ctx.textBaseline = "middle";

			ctx.fillStyle = randomColor(180, 240);
			ctx.fillRect(0, 0, this.options.width, this.options.height);

			if(this.options.type == "blend") { //判断验证码类型
				var txtArr = this.options.numArr.concat(this.options.letterArr);
			} else if(this.options.type == "number") {
				var txtArr = this.options.numArr;
			} else {
				var txtArr = this.options.letterArr;
			}

			for(var i = 1; i <= 4; i++) {
				var txt = txtArr[randomNum(0, txtArr.length)];
				this.options.code += txt;
				ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //随机生成字体大小
				ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色		
				ctx.shadowOffsetX = randomNum(-3, 3);
				ctx.shadowOffsetY = randomNum(-3, 3);
				ctx.shadowBlur = randomNum(-3, 3);
				ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
				var x = this.options.width / 5 * i;
				var y = this.options.height / 2;
				var deg = randomNum(-30, 30);
				/**设置旋转角度和坐标原点**/
				ctx.translate(x, y);
				ctx.rotate(deg * Math.PI / 180);
				ctx.fillText(txt, 0, 0);
				/**恢复旋转角度和坐标原点**/
				ctx.rotate(-deg * Math.PI / 180);
				ctx.translate(-x, -y);
			}
			/**绘制干扰线**/
			for(var i = 0; i < 4; i++) {
				ctx.strokeStyle = randomColor(40, 180);
				ctx.beginPath();
				ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
				ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
				ctx.stroke();
			}
			/**绘制干扰点**/
			for(var i = 0; i < this.options.width/4; i++) {
				ctx.fillStyle = randomColor(0, 255);
				ctx.beginPath();
				ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
				ctx.fill();
			}
		},
		
		/**验证验证码**/
		validate: function(code){
			var code = code.toLowerCase();
			var v_code = this.options.code.toLowerCase();
			if(code == v_code){
				return true;
			}else{
				this.refresh();
				return false;
			}
		}
	}
	/**生成字母数组**/
	function getAllLetter() {
		var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
		return letterStr.split(",");
	}
	/**生成一个随机数**/
	function randomNum(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}
	/**生成一个随机色**/
	function randomColor(min, max) {
		var r = randomNum(min, max);
		var g = randomNum(min, max);
		var b = randomNum(min, max);
		return "rgb(" + r + "," + g + "," + b + ")";
	}
	window.GVerify = GVerify;
})(window, document);
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
    this.cate=[];
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
      },
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
    $(".hidImg")
      .css("background", `url(${imgLeft[0]}) no-repeat`)
      .css("background-size", "200% 200%");

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
        <span class="oldPrice">吊牌价：&emsp;&emsp;<b>￥${
          data.price * 1.2
        }</b></span>
        <span class="newPrice">销售价：&emsp;&emsp;<em>￥${
          data.price
        }</em></span>
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
    srcs.map((item) => {
      $(`<img src=${item}>`)
        .appendTo(".selCol")
        .click(this.clickChangeBc.bind(this));
    });

    $(".selCol>img").eq(this.obj.srcIndex).addClass("bRed");
    let lis = this.cate.map((item) => `<li>${item}</li>`).join("");
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
      data: "ids=" + self.good_id + "&num=" + num,
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
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      success(res) {
        
        if (!res) {
          alert("加入购物车成功");
          location.reload()
        }else{
          alert("加入购物车失败！")
        }
      },
    });
  }
}

import Step from "./step.js";
export default class goodCar {
  data;
  ches;
  constructor(user) {
    this.user = user ;
    let s = localStorage.getItem("user");
    if (s) this.getAjax();
    
  }
  getAjax(num, rule, good_id, info = "auto") {
    let self = this;
    // 发送ajax请求，接收对应用户的购物车商品
    $.ajax({
      url: "./../../server/cart.php",
      data: `user=${this.user}&num=${num}&rule=${rule}&good_id=${good_id}&info=${info}`,
      success(res) {
        if (self.data) {
          self.data = null;
          $("tbody").children().not("#kong").remove();
          // 如果商品不存在显示文本
          if (!this.ches) $(".cartNotice").show();
          $("#goodFoot").removeClass("cloak_off")
        }
        self.data = JSON.parse(res);
        if(self.data.length===0){$("#goodFoot").addClass("cloak_off")}
        // 如果商品存在隐藏文本
        if (self.data.length !== 0) {
          $(".cartNotice").hide();
        }
        console.log(self.data);
        self.setgoodList();
       
      },
    });
  }
  // 生成商品列表
  setgoodList() {
    $(
      this.data
        .map((item, index) => {
          let trs = `
        <tr index="${index}">
            <td class="g_check">
             <label>
             <input type="checkbox">
             </label>
              <span class="cks ckss"></span>
              <img src=${JSON.parse(item.src)[0]} class='skip' alt="">
            </td>
            <td class="g_info">
              <span class='skip'>${item.info}</span>
            </td>
            <td class="g_rule"><span>尺码：${item.rule}</span></td>
            <td class="g_price"><span>¥${item.price}</span></td>
            <td class="g_num">
              <button class="sub">-</button>
              <input class='inp' type="text" value=${item.num}>
              <button  class="add">+</button>
            </td>
            <td class="g_total"><span>¥ ${item.price * item.num}</span></td>
            <td class="g_del"><a href="javascript:void(0)">删除</a></td>
          </tr>`;
          return trs;
        })
        .join("")
    ).appendTo("tbody");
    // 点击图片和信息跳转详情页面
    $.each($(".skip"), (i, item) => {
      $(item).click((e) => {
        let index = $(e.target).parents("tr").index() - 1;
        window.open(`../pages/details.html?id=${this.data[index].id}`);
      });
    });
    this.ches = $("input[type*=che]").not(".checks");
    $("input[type*=check]").click(this.checkHandler.bind(this));
    // 从本地获取多选框状态
 

    let loc = JSON.parse(localStorage.getItem("user"));
   
    if(loc.ckList===undefined)this.checkStroge();
    if (this.data.length !== 0 && loc.ckList!==undefined){
      Array.from(this.ches).forEach((item, i) => {
        item.checked = loc.ckList[i];
      });
      $(".checks")[1].checked=$(".checks")[0].checked = loc.ckList.every((item) => item);
     
    }
    this.censusNum();
    this.delElement();
    this.totalPrice();
    this.buyShopping();
    // 刷新如果本地获取的多选框状态都为true则全选
    this.changeCheckBg();
    this.buyShopping($("input[type*=check]"));
  }
  // 计算数量
  censusNum() {
    $.each($("tr[index]"), (index, item) => {
      let add = $(item).find(".add");
      let sub = $(item).find(".sub");
      let inp = $(item).find(".inp");
      new Step($(add), $(sub), $(inp), 1);
      $(inp).on("getNum", (e, data) => {
        let idx = $(e.target).parents("tr").attr("index");
        this.getAjax(data, this.data[idx].rule, this.data[idx].good_id);
        this.countPrice(data, $(item));
        this.totalPrice();
      });
    });
  }
  // 小计
  countPrice(num, item) {
    let idx = item.attr("index");
    item.find(".g_total>span").text(`¥${num * this.data[idx].price}`);
  }
  // 总价
  totalPrice() {
    let total = $.map(this.ches, (ele, i) => {
      if (ele.checked && ele) return this.data[i].num * this.data[i].price;
    }).reduce((value, item) => {
      return value + item;
    }, 0);
    $(".totalSum").text("￥" + total);
  }

  // 删除操作
  delElement() {
    // 单个
    
    if(this.data.length===0)return;
    $(".g_del>a").click((e) => {
      let trp = $(e.target).parents("tr");
      this.changeData("del", trp.attr("index"));
      this.totalPrice();
    });
    // 批量
   
   
    $(".gflDelete").click((e) => {
      let b = $("input[type*=che]").not(".checks");
      //  全部删除
      if ($(".checks").prop("checked")) {
       
          this.changeData("delAll");
        
      } else {
        // 批量
        $.each(b, (i, item) => {
          if (item.checked && !$(".checks").prop("checked")) {
            this.changeData("del", i);
          }
        });
      }
      this.totalPrice();
    });
  }

  // 全选
  checkHandler(e) {
    let target = $(e.target);
    if (target.hasClass("checks")) {
      $.each(this.ches, (index, item) => {
        item.checked = target.prop("checked");
      });
    }

    $.each($(".checks"), (index, ele) => {
      ele.checked = Array.from(this.ches).every((item) =>
        $(item).prop("checked")
      );
    });
    this.changeCheckBg();
    this.totalPrice();
    this.buyShopping();
    this.checkStroge();
  }

  // 存储多选框状态
  checkStroge() {
    let loc = localStorage.getItem("user");
    loc = JSON.parse(loc);
    if(loc.ckList===undefined){
      console.log(this.data.length);
      loc.ckList=new Array(this.data.length).fill(false);
    }else{
      loc.ckList = $.map(this.ches, (item) => item.checked);
    }
    localStorage.setItem("user", JSON.stringify(loc));
  }
  // 改变多选框背景
  changeCheckBg() {
    $.each($("input[type*=che]"), (i, item) => {
      let tNext = $(item).parent().next();
      $(item).prop("checked")
        ? tNext.removeClass("ckss")
        : tNext.addClass("ckss");
    });
  }
  // 结算按钮
  buyShopping() {
    let bool = Array.from(this.ches).some((item) => item.checked);
    if (bool) {
      $(".gfrRight").removeClass("changeBn");
    } else {
      $(".gfrRight").addClass("changeBn");
    }
  }

  // 改变数据发送ajax
  changeData(str, idx) {
    if (str === "del") {
      this.getAjax(
        this.data[idx].num,
        this.data[idx].rule,
        this.data[idx].good_id,
        str
      );
    } else if (str === "delAll") {
      this.getAjax(null, null, null, "delAll");
    }
  }
}

$(function(){
    (function(){
    let data=JSON.parse(localStorage.getItem('user'));
    
        if(!data||!data.user)return;
            $('.welcome>a').text(data.user+"，欢迎您")
            $('.logOff').addClass('cloak_on').nextUntil('.goodCart').addClass('cloak_off');
            $('.logOff>a').click(function(){
                localStorage.clear();
                location.reload();
            })
        $("h1").click(function(){
            window.open("./../index.html")
        })

        $.ajax({
            url:"../../server/getCartShop.php",
            data,
            type:"post",
            success(res){
                $(".cartCount").text(`( ${res?JSON.parse(res).length:0} )`);
                setShopList(JSON.parse(res));
                cloak(JSON.parse(res));
                $(".cartCount,.goodCart,.minCar").hover(mouseShowShop);
            }
        });
    
    function mouseShowShop(e){
        let target=$(e.target);
        $(".minCar").toggle();
        
    }
    function setShopList(data){
        let countPrice=0;
        let divs=data.map(function(item){
            
            let as=`<a href="./details.html?id=${item.id}">
                <img src="${JSON.parse(item.src)[0]}" alt="">
                <div class="mcText">
                    <span class=mcTitle>${item.info}</span>
                    <span class="mcPrice">
                        <i>￥ ${item.price}</i>
                        <em>× ${item.num}</em>
                        <b>${item.rule}</>
                    </span>
                </div>
            </a>`
            countPrice+=item.num*item.price;
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
        $(".minCar").hide()
    }
    function cloak(data){
        if(data.length===0){
            $(".clock").removeClass("cloak_off").css("font-size","12px");
            $(".totalPrice").addClass("cloak_off")
        }
    }

  })()
  })

export default class ShopIndex {
  constructor() {
   
  }
  createList(data, parent) {
    let divs = $("<div class='shopBox'></div>").append("<a class='Shopmore' target='_blank' href='./pages/shopList.html'></a>")
    data.forEach((item) => {
      let content = `<img src=${item.imgSrc}><span>${item.info}</spann>
            <b>￥${item.price}</b>`;
      $("<a class='as'  target='_blank'></a>").attr("href","./pages/details.html?id="+item.id)
        .append(content)
        .append("<p class='shopBa'><img src='./images/buyitnow.png'></p>")
        .appendTo(divs);
    });
    divs.appendTo(parent);
  }
  createTab() {
    let arr = [].slice.call(arguments);
    let parent = arr.shift();
    $("<a class='Tabmore' target='_blank' href='./pages/shopList.html'></a>").appendTo(parent);
    let tabTop = $("<div class='tabTop'></div>").appendTo(parent);
    arr.forEach((elem, index) => {
      // tab切换按钮
      $("<button>" + elem[0] + "</button>")
        .mouseenter(this.mouseTab.bind(this))
        .appendTo(tabTop);
      //   商品列表
      let divs = $("<div class='tabBox'></div>").attr("index", index);
      elem.slice(1).forEach((item) => {
        let content = `<img src=${item.imgSrc}><span>${item.info}</spann>
                <b>￥${item.price}</b>`;
        let zj = `<div class="zhiJiang""><div class='zj1'>直降</div><div class='zj2'>${item.cutPrice}</div></div>`;
        $("<a class='ta' href='javascript:void(0)'></a>")
          .append(content)
          .append("<p class='shopBa'><img src='./images/buyitnow.png'></p>")
          .append(zj)
          .appendTo(divs);
      });
      divs.appendTo(parent);
      $(".tabTop>button").eq(0).addClass("btnHover");
      $(".tabBox").eq(0).addClass("active");
    });
  }
  mouseTab(e) {
    let target = $(e.target);
    target.addClass("btnHover").siblings().removeClass("btnHover");
    $(".tabBox")
      .eq(target.index())
      .addClass("active")
      .siblings()
      .removeClass("active");
  }
  // 轮播图
  lbt(srcArr){
    $(srcArr.map(item => {
        let s=`<div class="carousel-item ">
              <img src=${item} class="d-block w-70" alt="...">
            </div>`
            return s;
     }).join("")).appendTo('.carousel-inner');
    $(".carousel-item").eq(0).addClass("active")
          
  }
}


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

export default class Magnifier {
  constructor() {}
  static mouseImg(e) {
    if (e.target.nodeName !== "IMG") return;
    let target = $(e.target);
    target.parent().addClass("bRed").siblings().removeClass("bRed");
    let imgLeft = $("[alt*='LI']").data("srcList");
    $("[alt*='LI']").attr("src", imgLeft[target.parent().index()]);
    $(".hidImg")
      .css("background", `url(${imgLeft[target.parent().index()]}) no-repeat`)
      .css("background-size", "200% 200%");
  }
  //   放大镜
  static mouseHandler(e) {
    if (e.type === "mouseenter") {
      $(".hidImg").addClass("cloak_on");
      $(".moveBox").addClass("cloak_on");
      $(".maxImg").mousemove(Magnifier.mouseHandler);
      $(".maxImg").mouseleave(Magnifier.mouseHandler);
    } else if (e.type === "mousemove") {
      Magnifier.moveMask(e.clientX, e.clientY);
    } else if (e.type === "mouseleave") {
      $(".hidImg").removeClass("cloak_on");
      $(".moveBox").removeClass("cloak_on");
      $(".maxImg").off("mousemove", Magnifier.mouseHandler);
      $(".maxImg").off("mouseleave", Magnifier.mouseHandler);
    }
  }
  //移动计算
  static moveMask(cx, cy) {
    let rect = $(".maxImg").get(0).getBoundingClientRect();
    let [w, h] = [$(".moveBox").width(), $(".moveBox").height()];
    let x = cx - w / 2 - rect.x;
    let y = cy - h / 2 - rect.y;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > $(".maxImg").width() - w) x = $(".maxImg").width() - w;
    if (y > $(".maxImg").height() - h) y = $(".maxImg").height() - h;
    $(".moveBox").css({
      left: x + "px",
      top: y + "px",
    });
    let xx = Math.floor(750 / $(".maxImg>img").eq(0).width());

    $(".hidImg").css({
      backgroundPositionX: -x * xx + "px",
      backgroundPositionY: -y * xx + "px",
    });
  }
}

/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/* global define */

;(function ($) {
  'use strict'

  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
  function safeAdd (x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xffff)
  }

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
  function bitRotateLeft (num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  function md5cmn (q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
  }
  function md5ff (a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t)
  }
  function md5gg (a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
  }
  function md5hh (a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t)
  }
  function md5ii (a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t)
  }

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
  function binlMD5 (x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32)
    x[((len + 64) >>> 9 << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5ff(a, b, c, d, x[i], 7, -680876936)
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5gg(b, c, d, a, x[i], 20, -373897302)
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5hh(d, a, b, c, x[i], 11, -358537222)
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5ii(a, b, c, d, x[i], 6, -198630844)
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = safeAdd(a, olda)
      b = safeAdd(b, oldb)
      c = safeAdd(c, oldc)
      d = safeAdd(d, oldd)
    }
    return [a, b, c, d]
  }

  /*
  * Convert an array of little-endian words to a string
  */
  function binl2rstr (input) {
    var i
    var output = ''
    var length32 = input.length * 32
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff)
    }
    return output
  }

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
  function rstr2binl (input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    var length8 = input.length * 8
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32)
    }
    return output
  }

  /*
  * Calculate the MD5 of a raw string
  */
  function rstrMD5 (s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
  }

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
  function rstrHMACMD5 (key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binlMD5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5c5c5c5c
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
  }

  /*
  * Convert a raw string to a hex string
  */
  function rstr2hex (input) {
    var hexTab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
    }
    return output
  }

  /*
  * Encode a string as utf-8
  */
  function str2rstrUTF8 (input) {
    return unescape(encodeURIComponent(input))
  }

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
  function rawMD5 (s) {
    return rstrMD5(str2rstrUTF8(s))
  }
  function hexMD5 (s) {
    return rstr2hex(rawMD5(s))
  }
  function rawHMACMD5 (k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
  }
  function hexHMACMD5 (k, d) {
    return rstr2hex(rawHMACMD5(k, d))
  }

  function md5 (string, key, raw) {
    if (!key) {
      if (!raw) {
        return hexMD5(string)
      }
      return rawMD5(string)
    }
    if (!raw) {
      return hexHMACMD5(key, string)
    }
    return rawHMACMD5(key, string)
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return md5
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = md5
  } else {
    $.md5 = md5
  }
})(this)

export default class shopList {
  idx;
  totalPages;
  info;
  constructor(url) {
    this.url = url;
    this.idx=0;
    this.info=""
    this.ajax();
    $(".lmtUl").click("li", this.ascPrice.bind(this));
    this.getPages()
  }
  getPages(){
    let self = this;
    $.ajax({
      url:"./../../server/getPages.php",
      success(page){
       self.totalPages=page;
       self.setPages();
      
      }
    })
  }
  ajax() {
    let self = this;
    $(".listBox").empty();
    // $(".listFoot").empty();
   
    $.ajax({
      url: this.url,
      dataType: "json",
      data: "name=" + self.info+"&pageNum="+self.pages,
      success(data) {
        self.setShopList(data);
       
      },
    });
    
  }
// 左边列表
  static setLeftList(data) {
    let arr = Object.getOwnPropertyNames(data);
    arr = arr.slice(1);
    arr.forEach((elem, index) => {
      let divs = $("<div class='little'></div>").append(
        "<p class='title'>" + data.title[index] + "</p>"
      );
      let lis = $("<div class='lists'></div>").appendTo(divs);
      data[elem].forEach((item) => {
        $("<a href='#'></a>").text(item).appendTo(lis);
      });
      divs.appendTo(".listText");
    });
  }
// 排序
  ascPrice(e) {
    if (e.target.nodeName === "EM") return;
    let target = $(e.target);

    // this.info = "";
    switch ($(e.target).index()) {
      case 0:
        this.info=""
        break;
      case 1:
        this.info  = "src";
        break;
      case 2:
        this.info  = "info";
        break;
      case 3:
        this.info  = "price";
        break;
    }
    target.addClass("active").siblings().removeClass("active");
    this.ajax();
    
  }
  // 商品列表
  setShopList(data) {
    data.forEach((item, index) => {
      let srcs = JSON.parse(item.src);
      let as = $(`<a  class='lbs' target="_blank">
              <div class="imgBox">
                  <img class='bigImg' src=${srcs[0]}>
                  <div class="minImg" index=${index}></div>
              </div>
              <p>${item.info}</p>
              <span>￥ ${item.price}</span>
              </a>`)
        .appendTo(".listBox")
        .attr("href", "./details.html?id=" + item.id)
        .mouseleave(() => {
          $(`div[index=${index}]>img`).removeClass("bRed");
        });
      srcs.forEach((s) => {
        $("<img>").attr("src", s).appendTo(`div[index=${index}]`);
      });

      $(`.imgBox>div[index=${index}]`).mouseover("img", function (e) {
        if (e.target.nodeName !== "IMG") return;
        $(`div[index=${index}]`).prev().attr("src", srcs[$(e.target).index()]);
        // $(e.target).addClass("bRed").siblings().removeClass("bRed");
        $(e.target)
          .css("border-color", "#f33")
          .siblings()
          .css("border-color", "#b8b8b8");
      });
    });
   
    
  }
  // 分页
  setPages() {
    $(".nowList").text(`${this.pages+1}/${this.totalPages}`);
    let s = $("<span class='catalog'></span>").appendTo(".listFoot");
    for (let i = 1; i < this.totalPages*1+1;i++) {
      
      $("<i></i>").text(i).appendTo(s);
    }
    $("<em class='next'>下一页</em><em class='end'>末页</em><em class='pa'>共 " + this.totalPages + " 页</em>").appendTo(s);
    $("<span class='lfText'></span>")
      .text(`显示 1-25(共${this.totalPages*25}个)`)
      .appendTo(".listFoot");
      $(".catalog>i:eq(0)").addClass("fontRed");
    $(".catalog").click(this.clickChangePages.bind(this));
    
  }
  clickChangePages(e){
    let target=$(e.target);
    // e.preventDefault();
    if(e.target.nodeName!=="EM" && e.target.nodeName!=="I")return;
    let len=$(".catalog>i").length;
    if(target.hasClass("next")){
      $(".next").text("上一页")
      if(++this.idx>len-1){
        this.idx=0;
        $(".next").text("下一页")
      }
      this.pages=this.idx;
    }else if(e.target.tagName==="I"){
      this.pages=target.index();
    }else{
      this.pages=len-1;
    }
    this.ajax();
    $(".lfText").text(`显示 ${this.pages*25+1}-${(this.pages+1)*25}(共${this.totalPages*25})`);
    $(".nowList").text(`${this.pages+1}/${this.totalPages}`);
  }
  set pages(n){
    this.idx=n;
    $(".catalog>i").eq(n).addClass("fontRed").siblings().removeClass("fontRed");
  }
  get pages(){
    return this.idx;
  }
}

export default class Step{
    value;
    ids;
    constructor(add,sub,inp,a) {
        this.add=add;
        this.sub=sub;
        this.inp=inp;
        this.value=1;
        this.add.click(this.clickHandler.bind(this));    
        this.sub.click(this.clickHandler.bind(this));    
        this.inp.on("input",this.inputHandler.bind(this));
        // if(!a){
        //     // 详情页

        //     let data=localStorage.getItem('user');
        //     if(data){
        //     data=JSON.parse(data);
        //     this.value=data.num;
        //     }
        // }else{
        //     // 购物车
        //     this.value=this.inp.val()
        //     // 每次取到的都是当前输入框的值
        // }
        this.value=this.inp.val()
    }
    clickHandler(e){
        let target=$(e.target);
        if(target.hasClass("add")){
            this.value++;
        }else {
            this.value--;
        }
        this.judgeValue();
    }
    inputHandler(e){
        if(this.ids)return;
        this.ids=setTimeout(()=>{
            clearTimeout(this.ids);
            this.ids=0;
            let target=$(e.target);
            this.inp.val(target.val().replace(/\D/,""));
            this.value= this.inp.val();
            this.judgeValue();
        },500)
    }
   judgeValue(){
        
        if(this.value<=0)this.value=1;
        if(this.value>=990)this.value=999;
        // 获取本地存储数量
        this.inp.val(this.value);
    //    抛发参数
        this.inp.trigger('getNum',this.value);
    //    return this.value
    }
   
}