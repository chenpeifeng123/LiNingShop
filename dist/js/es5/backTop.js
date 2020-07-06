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
      zIndex: 999
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
      zIndex: 999
    });
    $("#backTop").css({
      position: "fixed",
      right: 0,
      top: 0,
      color: "#000",
      userSelect: "none",
      height: "100%"
    });
    this.doc.find(".hideTag").click(e => this.clickHide(e));
    this.doc.find(".toggleLogo").click(e => this.clickShow(e));
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
      }
    });
  }
  mouseHandler(e) {
    if (e.type === "mouseenter") {

      $(".enter").css({
        pointerEvents: "auto"

      });
    } else if (e.type === "mouseleave") {

      $(".enter").css({
        pointerEvents: "none"
      });
    }
  }
}