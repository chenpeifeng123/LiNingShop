export default class Login {
  ids;
  constructor(iden) {
    this.iden = iden;
    console.log("!23");
    this.judge();
  this.vCode=this.randomCode();
  }
  focusFn;
  judge() {
    this.focusFn=e=>this.focusHandler(e);
    $(".form").on("focus","input",this.focusFn)
    if (this.ids) return;
    $(".form").on("input", "input", (e) => {
      this.ids = setTimeout(() => {
        clearTimeout(this.ids);
        this.ids = 0;
        let target = $(e.target);
        let bool=this.testVerify(target);
        if(!bool){
            target.addClass("inpSuccess").removeClass("inpFail")
            .next().text("× 格式错误").css("color","#f33")
        }else{
            target.addClass("inpFail").removeClass("inpSuccess")
            .next("span").text("√ 格式正确").css("color","green")
        }
      }, 300);
    });
  }
  testVerify(elem){
     switch(elem.attr("id")){
            case "user":
                return /^[\w\u4e00-\u9fa5]{4,16}$/.test(elem.val());
            case "pwd":
                return /^(?=\D+\d)[A-Za-z\d]{6,16}/.test(elem.val())
            case "email":
                return /^\w+\@\w+\.\w+/.test(elem.val());
            case "vCode":
                return elem.val()===this.vCode;
            case "repeatPwd":
                return $("#pwd").val()?$("#pwd").val()===elem.val():false;
            
     }
    
  }
//   随机验证码
  randomCode(){
        // 48~57 1-9
        // 65~90 A-Z
        // 97~122 a-z
        let arr=[];
        for(let i=48;i<122;i++){
            if(i===58){
                i=64;
                continue;
            }
            if(i===91){
                i=96;
                continue;
            }
            arr.push(String.fromCharCode(i));
        }
        arr.sort(()=>Math.random()-0.5)
        arr.length=4;
        $(".codeText").text(arr.join(" ")).click(()=>{
            this.randomCode();
            $(".vCode").get(0).value="";
        });
        this.vCode=arr.join("")
        return arr.join("");
        
    }
    focusHandler(e){
        let target=$(e.target);
        target.next("span").css("display","block");
        $(".form").off("focus",this.focusHandler);
        
    }
}
