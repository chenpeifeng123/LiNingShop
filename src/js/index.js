export default class ShopIndex {
  constructor() {}
  createList(data, parent) {
    let divs = $("<div class='shopBox'></div>");
    data.forEach((item) => {
      let content = `<img src=${item.imgSrc}><span>${item.info}</spann>
            <b>￥${item.price}</b>`;
      let a = $("<a href='#'></a>")
        .append(content)
        .append("<p class='shopBa'><img src='./images/buyitnow.png'></p>")
        .appendTo(divs);
    });

    divs.appendTo(parent);
  }
  createTab() {
    let arr = [].slice.call(arguments);
    let parent = arr.shift();
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
        $("<a href='#'></a>")
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
}
