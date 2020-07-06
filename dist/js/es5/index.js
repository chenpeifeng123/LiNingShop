
export default class ShopIndex {
  constructor() {}
  createList(data, parent) {
    let divs = $("<div class='shopBox'></div>").append("<a class='Shopmore' target='_blank' href='./pages/shopList.html'></a>");
    data.forEach(item => {
      let content = `<img src=${item.imgSrc}><span>${item.info}</spann>
            <b>￥${item.price}</b>`;
      $("<a class='as'  target='_blank'></a>").attr("href", "./pages/details.html?id=" + item.id).append(content).append("<p class='shopBa'><img src='./images/buyitnow.png'></p>").appendTo(divs);
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
      $("<button>" + elem[0] + "</button>").mouseenter(this.mouseTab.bind(this)).appendTo(tabTop);
      //   商品列表
      let divs = $("<div class='tabBox'></div>").attr("index", index);
      elem.slice(1).forEach(item => {
        let content = `<img src=${item.imgSrc}><span>${item.info}</spann>
                <b>￥${item.price}</b>`;
        let zj = `<div class="zhiJiang""><div class='zj1'>直降</div><div class='zj2'>${item.cutPrice}</div></div>`;
        $("<a class='ta' href='javascript:void(0)'></a>").append(content).append("<p class='shopBa'><img src='./images/buyitnow.png'></p>").append(zj).appendTo(divs);
      });
      divs.appendTo(parent);
      $(".tabTop>button").eq(0).addClass("btnHover");
      $(".tabBox").eq(0).addClass("active");
    });
  }
  mouseTab(e) {
    let target = $(e.target);
    target.addClass("btnHover").siblings().removeClass("btnHover");
    $(".tabBox").eq(target.index()).addClass("active").siblings().removeClass("active");
  }
  // 轮播图
  lbt(srcArr) {
    $(srcArr.map(item => {
      let s = `<div class="carousel-item ">
              <img src=${item} class="d-block w-70" alt="...">
            </div>`;
      return s;
    }).join("")).appendTo('.carousel-inner');
    $(".carousel-item").eq(0).addClass("active");
  }
}