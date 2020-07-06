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