function change_page(page_name) {
    for(var i=0; i<3; i++){
        document.getElementsByClassName("main")[i].style.display = "none"
    }

    document.getElementById(page_name).style.display = ""
}

function make_question_EJ() {
    //ページ携帯
    var base = "E-J"
    //現在開いているページ名を取得
    var setpage = document.getElementById(base);

    //imputから範囲を取り出す
    var rangenum_front = document.getElementById(base+"_rangenum_front").value;
    var rangenum_rear = document.getElementById(base+"_rangenum_rear").value;
    
    //範囲が空白の場合、はじめを1、終わりを最後(GAS上で空白"")にする　or　1以下の場合は全選択
    if (rangenum_front == "" || rangenum_front < 1) { rangenum_front = 1 };
    if (rangenum_rear == "" || rangenum_rear < 1) { rangenum_rear = 1935 };
    rangenum_front = Number(rangenum_front);
    rangenum_rear = Number(rangenum_rear);
    console.log(rangenum_front+","+rangenum_rear);

    //minがmaxより大きかったらエラー表示
    if(rangenum_front > rangenum_rear){
        alert("エラー\n範囲は「範囲の最小値」～「範囲の最大値」で入力してください")
    }else if(rangenum_rear-rangenum_front<9){
        alert("エラー\n範囲の大きさは10以上を指定してください")
    }else{
        /** 重複チェック用配列 */
        var randoms = [];

        /** 最小値と最大値 */
        var min = rangenum_front, max = rangenum_rear;
        
        /** 重複チェックしながら乱数作成 */
        for(i = 0; i <= 10; i++){
        while(true){
            var tmp = Math.floor( Math.random() * (max - min + 1)) + min;;
            if(!randoms.includes(tmp)){
            randoms.push(tmp);
            break;
            }
        }
        }
        console.log(randoms);

        //配列内の値を順番に並べる
        randoms.sort(function(first, second){
            return first - second;
        });

        //tableから問題情報を取得　問題を表示　回答をtempWordに入れる
        document.getElementById("tempWord_EJ").innerHTML = ""
        for(var i=0; i<10; i++){
            setpage.getElementsByClassName("wordNum")[i].innerHTML = document.getElementById("words_table").rows[randoms[i]].cells[0].innerHTML;
            setpage.getElementsByClassName("question_text")[i].innerHTML = document.getElementById("words_table").rows[randoms[i]].cells[1].innerHTML;
            document.getElementById("tempWord_EJ").innerHTML = `${document.getElementById("tempWord_EJ").innerHTML + document.getElementById("words_table").rows[randoms[i]].cells[2].innerHTML},`;
        }

        for (let i = 0; i < 10; i++) {
            setpage.getElementsByClassName("answer")[i].innerHTML = "";
            setpage.getElementsByClassName("displayButton")[i].innerHTML = "<nobr>表示</nobr>"
        }
        document.getElementById(base+"_answer_button").innerHTML = "回答を表示"
    }
}

function make_answer_EJ() {
    //ページ携帯
    var base = "E-J"
    //現在開いているページ名を取得
    var setpage = document.getElementById(base);

    var deta = document.getElementById("tempWord_EJ").innerHTML;

    if (deta != "") {
        if (document.getElementById(base+"_answer_button").innerHTML == "回答を表示") {
            let deta_array = deta.split(",")
            console.log(deta_array)

            for (let i = 0; i < 10; i++) {
                setpage.getElementsByClassName("answer")[i].innerHTML = deta_array[i];
                setpage.getElementsByClassName("displayButton")[i].innerHTML = "<nobr>非表示</nobr>"
            }

            document.getElementById(base+"_answer_button").innerHTML = "回答を非表示"
        } else if (document.getElementById(base+"_answer_button").innerHTML == "回答を非表示") {
            for (let i = 0; i < 10; i++) {
                setpage.getElementsByClassName("answer")[i].innerHTML = "";
                setpage.getElementsByClassName("displayButton")[i].innerHTML = "<nobr>表示</nobr>"
            }
            document.getElementById(base+"_answer_button").innerHTML = "回答を表示";
        }
    } else {
        setpage.getElementsByClassName("answer")[0].innerHTML = "問題を作成してください";
    }
}

function make_answer_specify_EJ(i) {
    //ページ携帯
    var base = "E-J"
    //現在開いているページ名を取得
    var setpage = document.getElementById(base);

    var deta = document.getElementById("tempWord_EJ").innerHTML;

    if (deta != "") {
        if (setpage.getElementsByClassName("displayButton")[i].innerHTML == "<nobr>表示</nobr>") {
            let deta_array = deta.split(",")
            console.log(deta_array)

            setpage.getElementsByClassName("answer")[i].innerHTML = deta_array[i];

            setpage.getElementsByClassName("displayButton")[i].innerHTML = "<nobr>非表示</nobr>"
        } else if (setpage.getElementsByClassName("displayButton")[i].innerHTML == "<nobr>非表示</nobr>") {

            setpage.getElementsByClassName("answer")[i].innerHTML = "";

            setpage.getElementsByClassName("displayButton")[i].innerHTML = "<nobr>表示</nobr>";
        }
    } else {
        setpage.getElementsByClassName("answer")[0].innerHTML = "問題を作成してください";
    }
}

function make_question_JE() {
    //ページ携帯
    var base = "J-E"
    //現在開いているページ名を取得
    var setpage = document.getElementById(base);

    //imputから範囲を取り出す
    var rangenum_front = document.getElementById(base+"_rangenum_front").value;
    var rangenum_rear = document.getElementById(base+"_rangenum_rear").value;
    
    //範囲が空白の場合、はじめを1、終わりを最後(GAS上で空白"")にする　or　1以下の場合は全選択
    if (rangenum_front == "" || rangenum_front < 1) { rangenum_front = 1 };
    if (rangenum_rear == "" || rangenum_rear < 1) { rangenum_rear = 1935 };
    rangenum_front = Number(rangenum_front);
    rangenum_rear = Number(rangenum_rear);
    console.log(rangenum_front+","+rangenum_rear);

    //minがmaxより大きかったらエラー表示
    if(rangenum_front > rangenum_rear){
        alert("エラー\n範囲は「範囲の最小値」～「範囲の最大値」で入力してください")
    }else if(rangenum_rear-rangenum_front<9){
        alert("エラー\n範囲の大きさは10以上を指定してください")
    }else{
        /** 重複チェック用配列 */
        var randoms = [];

        /** 最小値と最大値 */
        var min = rangenum_front, max = rangenum_rear;
        
        /** 重複チェックしながら乱数作成 */
        for(i = 0; i <= 10; i++){
        while(true){
            var tmp = Math.floor( Math.random() * (max - min + 1)) + min;;
            if(!randoms.includes(tmp)){
            randoms.push(tmp);
            break;
            }
        }
        }
        console.log(randoms);

        //配列内の値を順番に並べる
        randoms.sort(function(first, second){
            return first - second;
        });

        //tableから問題情報を取得　問題を表示　回答をtempWordに入れる
        document.getElementById("tempWord_JE").innerHTML = ""
        for(var i=0; i<10; i++){
            setpage.getElementsByClassName("wordNum")[i].innerHTML = document.getElementById("words_table").rows[randoms[i]].cells[0].innerHTML;
            setpage.getElementsByClassName("question_text")[i].innerHTML = document.getElementById("words_table").rows[randoms[i]].cells[2].innerHTML;
            document.getElementById("tempWord_JE").innerHTML = `${document.getElementById("tempWord_JE").innerHTML + document.getElementById("words_table").rows[randoms[i]].cells[1].innerHTML},`;
        }

        for (let i = 0; i < 10; i++) {
            setpage.getElementsByClassName("answer")[i].innerHTML = "";
            setpage.getElementsByClassName("displayButton")[i].innerHTML = "<nobr>表示</nobr>"
        }
        document.getElementById(base+"_answer_button").innerHTML = "回答を表示"
    }
}

function make_answer_JE() {
    //ページ携帯
    var base = "J-E"
    //現在開いているページ名を取得
    var setpage = document.getElementById(base);

    var deta = document.getElementById("tempWord_JE").innerHTML;

    if (deta != "") {
        if (document.getElementById(base+"_answer_button").innerHTML == "回答を表示") {
            let deta_array = deta.split(",")
            console.log(deta_array)

            for (let i = 0; i < 10; i++) {
                setpage.getElementsByClassName("answer")[i].innerHTML = deta_array[i];
                setpage.getElementsByClassName("displayButton")[i].innerHTML = "<nobr>非表示</nobr>"
            }

            document.getElementById(base+"_answer_button").innerHTML = "回答を非表示"
        } else if (document.getElementById(base+"_answer_button").innerHTML == "回答を非表示") {
            for (let i = 0; i < 10; i++) {
                setpage.getElementsByClassName("answer")[i].innerHTML = "";
                setpage.getElementsByClassName("displayButton")[i].innerHTML = "<nobr>表示</nobr>"
            }
            document.getElementById(base+"_answer_button").innerHTML = "回答を表示";
        }
    } else {
        setpage.getElementsByClassName("answer")[0].innerHTML = "問題を作成してください";
    }
}

function make_answer_specify_JE(i) {
    //ページ携帯
    var base = "J-E"
    //現在開いているページ名を取得
    var setpage = document.getElementById(base);

    var deta = document.getElementById("tempWord_JE").innerHTML;
    console.log(deta);
    if (deta != "") {
        console.log("実行if");
        console.log(setpage.getElementsByClassName("displayButton")[i].innerHTML);
        if (setpage.getElementsByClassName("displayButton")[i].innerHTML == "<nobr>表示</nobr>") {
            console.log("実行ifif");
            let deta_array = deta.split(",")
            console.log(deta_array)

            setpage.getElementsByClassName("answer")[i].innerHTML = deta_array[i];

            setpage.getElementsByClassName("displayButton")[i].innerHTML = "<nobr>非表示</nobr>"
        } else if (setpage.getElementsByClassName("displayButton")[i].innerHTML == "<nobr>非表示</nobr>") {
            console.log("実行ifelseif");
            setpage.getElementsByClassName("answer")[i].innerHTML = "";

            setpage.getElementsByClassName("displayButton")[i].innerHTML = "<nobr>表示</nobr>";
        }else{
            console.log("実行ifelse");
        }
    } else {
        console.log("実行else");
        setpage.getElementsByClassName("answer")[0].innerHTML = "問題を作成してください";
    }
}
