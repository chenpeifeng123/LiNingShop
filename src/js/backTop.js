export default class backTop {
  bool;
  ids;
  aLast;
  constructor(win,a) {
    this.ids = setInterval(this.backTop.bind(this), 16);
    this.aLast = a;
    this.win=win;
    this.aLast.click(this.clickHandler.bind(this));
    
    this.win.scroll(this.scrollHandler.bind(this));
  }

  scrollHandler() {
    console.log(this.win.scrollTop());
    if (this.win.scrollTop() >= this.win[0].outerHeight / 2) {
        
      this.aLast.css("visibility", "visible");
    } else {
      this.aLast.css("visibility", "hidden");
    }
  }

  clickHandler() {
    this.bool = !this.bool;
  }
  backTop() {
    if (!this.bool) return;
    let top = this.win.scrollTop();
    top -= 100;
    this.win.scrollTop(top);
    if (this.win.scrollTop() <= 0) this.bool = false;
  }
}
