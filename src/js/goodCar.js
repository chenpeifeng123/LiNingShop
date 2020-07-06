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
    // location.reload()
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
