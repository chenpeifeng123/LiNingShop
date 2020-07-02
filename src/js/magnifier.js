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
