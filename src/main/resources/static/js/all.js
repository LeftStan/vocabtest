let len = 0;
let index = 0;
let index0 = 0;
let words = [];
let answer = [];
let answers = [];
let correct = 0;
let res = 0;
let all = 0;

//common
function getWords(bookType){
    console.log(bookType);
    $.post("/vocab",{
        bookType: bookType.toString()
    },  function(data,status){
        // console.log(data);
        init(bookType, data);
    });
}
function words_num(bookType){
    let res_title = $("#res_source");
    switch(bookType){
        case "pri": all = 1000; res_title.append("小学词汇"); break;
        case "middle": all = 2000;res_title.append("初中词 汇");  break;
        case "high": all = 4000; res_title.append("高中词汇"); break;
        case "cet4": all = 4500;res_title.append("四级词汇");  break;
        case "cet6": all = 6500; res_title.append("六级词汇"); break;
        case "kaoyan": all = 6800; res_title.append("考研词汇"); break;
        case "toefl": all = 7500; res_title.append("托福词汇"); break;
        case "gre": all = 13000; res_title.append("GRE词汇"); break;
    }
}
function cal_res(){
    console.log("correct:" + res);
    console.log("len:" + len);
    console.log("all:" + all);
    //计算正确率
    let ratio = res/len;
    //根据准确率给予适当加分
    if(ratio === 1)ratio += 0.2;
    else if(ratio > 0.9)ratio += 0.08;
    else if(ratio > 0.8)ratio += 0.05;
    else if(ratio > 0.6)ratio += 0.03;
    else if(ratio > 0.4)ratio += 0.02;
    res = Math.round(ratio * all);
    //保底分数为100
    if(res < 100)res = 100;
    $("#res_num").text(res);
}
function next(){
    $("#choose_img").remove();
    //判断题目是否出完
    if(index < len){
        let num = randomNum(1, 4);
        $("#word-content").text(words[index]);
        $("#count").text(index+1+ "/" +len);
        for(let i = 1; i < 5; i++){
            let trans = $("#trans"+num);
            if(i === 1){
                trans.text(answer[index++]);
                correct = num;
                // trans.text(answer[index++]);
                // correct = 1;
            }
            else{
                trans.text(answers[index0++]);
                // trans.text(answers[index0++]);
            }
            num = (num+1)%5;
            if(num === 0)num = 1;
            // console.log(num);
        }
    }
    //跳转结果页面
    else{
        console.log(res);
        cal_res();
        if($("#test").is(":hidden")){
            $("#question").toggle();
        }else{
            countCheck();
            $("#test").toggle();
        }
        $("#res").toggle();
    }
}

//question
function reveal(ans_num){
    let choose = $("#answer"+ans_num)
    if(ans_num === correct){
        choose.attr("class", "correct");
        choose.append("<img src='../img/tick.png' id='choose_img' class='choose_img'>");
        res++
    }
    else{
        choose.attr("class", "wrong");
        choose.append("<img src='../img/cross.png'  id='choose_img' class='choose_img'>");
    }


    $(document).ready(function(){
        setTimeout(function(){
            $("#answer"+ans_num).removeClass();
            next();
        }, 200)
    })
}
function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        default:
            return 0;
    }
}


//test
let isCheckAll = false;
function swapCheck() {
    if (isCheckAll) {
        $("input[type='checkbox']").each(function() {
            this.checked = false;
        });
        isCheckAll = false;
    } else {
        $("input[type='checkbox']").each(function() {
            this.checked = true;
        });
        isCheckAll = true;
    }
}
function countCheck() {
    $("input[type='checkbox']").each(function() {
            if(this.checked === true)
                res++;
            if(this.id==="check_all")
                res--;
    });
}