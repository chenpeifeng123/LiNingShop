export default class Carousel{
    srcList;
    elem;
    parent;
    pos=0;
    ids;
    wid=706;
    x=0;
    constructor(srcList,parent){
        this.srcList=srcList;
        this.parent=parent || $("body");
        this.elem=this.createElem();
    }
    createElem(){
        let ul=$("<ul class='boxImg'></ul>");
        this.srcList.forEach(item => {
            let li=$("<li></li>");
            $("<img>").attr("src",item).appendTo(li)
            li.appendTo(ul);
        });
        ul.appendTo(this.parent);
        this.createBn();
    
    }
    createBn(){
        let turn=$("<div class='bnTurn'></div>").appendTo(this.parent.parent())
        $("<a href='javascript:void(0)' class='bnl'></a>").appendTo(turn).click(e=>this.clickBn(e));
        $("<a href='javascript:void(0)' class='bnr'></a>").appendTo(turn).click(e=>this.clickBn(e))
        $(".boxImg").css("left",-this.wid*this.pos+"px")
    }
    clickBn(e){
     
        let target=$(e.target);
        if(target.hasClass("bnr")){
            this.pos++;
            if(this.pos>this.srcList.length-1)this.pos=0;
         
        }else{
            this.pos--;
    
            if(this.pos<0){
                // this.pos=0
                this.pos=this.srcList.length-1;
            }; 
        }
        $(".boxImg").css("left",-this.wid*this.pos+"px")
    }
    // moveImage(str){
      
    // }
}