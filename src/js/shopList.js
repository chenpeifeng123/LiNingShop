export default class shopList {
  idx=0;
  totalPages;
  info="";
  constructor(url) {
    this.url = url;
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
