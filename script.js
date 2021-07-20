class Calculator{
    constructor(prvOpTxt,curOpTxt){
        this.prvOpTxt=prvOpTxt;
        this.curOpTxt=curOpTxt;
        this.clear();
    }
    clear(){
        this.prevOp='';
        this.curOp='';
        this.operation=undefined;
    }
    delete(){
        this.curOp=this.curOp.toString().slice(0,-1);
    }
    appndNum(number){
        if(number==='.' && this.curOp.includes('.')){return;}
        this.curOp=this.curOp.toString()+number.toString();
    }
    chooseOprtn(operation){
        if(this.curOp===''){return;}
        if(this.prevOp!=''){this.compute();}
        this.operation=operation;
        this.prevOp=this.curOp;
        this.curOp='';
    }
    compute(){
        let computation;
        const prev=parseFloat(this.prevOp);
        const cur=parseFloat(this.curOp);
        if(isNaN(prev) || isNaN(cur)){return;}
        switch(this.operation){
            case '+':computation=prev+cur;break;
            case '*':computation=prev*cur;break;
            case '-':computation=prev-cur;break;
            case '÷':computation=prev/cur;break;
            case '%':computation=prev%cur;break;
            default : return;
        }
        this.curOp=computation;
        this.operation=undefined;
        this.prevOp='';
    }
    getDispNum(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    updateDisplay(){
        this.curOpTxt.innerText=this.getDispNum(this.curOp);
        if(this.operation!=null){
            this.prvOpTxt.innerText=
            `${this.getDispNum(this.prevOp)} ${this.operation}`
        }
        else{
            this.prvOpTxt.innerText='';
        }
        
    }
}


const num=document.querySelectorAll('[number]');
const oprnd=document.querySelectorAll('[operantion]');
const eql=document.querySelector('[equals]');
const ac=document.querySelector('[allclear]');
const del=document.querySelector('[delete]');
const prvOpTxt=document.querySelector('[prevOp]');
const curOpTxt=document.querySelector('[curOp]');


const calculate=new Calculator(prvOpTxt,curOpTxt);

num.forEach( button=>{
    button.addEventListener('click',()=>{
        calculate.appndNum(button.innerText);
        calculate.updateDisplay();
    })
})

oprnd.forEach( button=>{
    button.addEventListener('click',()=>{
        calculate.chooseOprtn(button.innerText);
        calculate.updateDisplay();
    })
})

eql.addEventListener('click',()=>{
    calculate.compute();
    calculate.updateDisplay();
})

ac.addEventListener('click',()=>{
    calculate.clear();
    calculate.updateDisplay();
})

del.addEventListener('click',()=>{
    calculate.delete();
    calculate.updateDisplay();
})