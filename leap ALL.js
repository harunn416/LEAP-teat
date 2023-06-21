function change_page(page_name) {
    for(var i=0; i<4; i++){
        document.getElementsByClassName("main")[i].style.display = "none";
    }

    document.getElementById(page_name).style.display = "";
    document.getElementById("setpage").innerHTML = page_name;
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
    }else if(rangenum_rear-rangenum_front<10){
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
        if(document.getElementsByName(base+"_random_checkbox")[0].checked == true){
            randoms.sort(function(first, second){
                return first - second;
            });
        }

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

function make_answer_specific_EJ(i) {
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
    }else if(rangenum_rear-rangenum_front<10){
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
        if(document.getElementsByName(base+"_random_checkbox")[0].checked == true){
            randoms.sort(function(first, second){
                return first - second;
            });
        }

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

function make_answer_specific_JE(i) {
    //ページ携帯
    var base = "J-E"
    //現在開いているページ名を取得
    var setpage = document.getElementById(base);

    var deta = document.getElementById("tempWord_JE").innerHTML;
    if (deta != "") {
        if (setpage.getElementsByClassName("displayButton")[i].innerHTML == "<nobr>表示</nobr>") {
            let deta_array = deta.split(",")
            console.log(deta_array)

            setpage.getElementsByClassName("answer")[i].innerHTML = deta_array[i];

            setpage.getElementsByClassName("displayButton")[i].innerHTML = "<nobr>非表示</nobr>"
        } else if (setpage.getElementsByClassName("displayButton")[i].innerHTML == "<nobr>非表示</nobr>") {
            setpage.getElementsByClassName("answer")[i].innerHTML = "";

            setpage.getElementsByClassName("displayButton")[i].innerHTML = "<nobr>表示</nobr>";
        }else{
        }
    } else {
        setpage.getElementsByClassName("answer")[0].innerHTML = "問題を作成してください";
    }
}

function make_question_ALL(type){
    // table要素を取得
    var tableElem = document.getElementById('all_table');

    //imputから範囲を取り出す
    var rangenum_front = document.getElementById("all_rangenum_front").value;
    var rangenum_rear = document.getElementById("all_rangenum_rear").value;

    rangenum_front = Number(rangenum_front);
    rangenum_rear = Number(rangenum_rear);

    if(rangenum_front == "" || rangenum_rear == ""){alert("範囲を両方入力してください")}
    else if(rangenum_front < 1 || rangenum_rear > 1935){alert("範囲は1~1935の間に設定してください")}
    else if(rangenum_rear <= rangenum_front){alert("正しく範囲を入力してください")}
    else{//一度すべてを消して初期化

        //テーブルの初期化
        tableElem.remove();

        //Table作成
        var table = document.createElement("table");
        //ID属性の付与
        table.setAttribute("id", "all_table");
        table.setAttribute("border", "1")
        table.setAttribute("class", "Qtable")
        // 1行目の作成
        const row1 = document.createElement("tr");
        //1行目の内容作成
        const cell1_1 = document.createElement("th");
        cell1_1.innerHTML = "列<br>番号";
        const cell1_2 = document.createElement("th");
        cell1_2.innerHTML = "単語<br>番号";
        const cell1_3 = document.createElement("th");
        cell1_3.innerHTML = "問題";
        const cell1_4 = document.createElement("th");
        cell1_4.innerHTML = "答え<br>表示";
        const cell1_5 = document.createElement("th");
        cell1_5.innerHTML = "答え";
        //1行目に追加
        row1.appendChild(cell1_1);
        row1.appendChild(cell1_2);
        row1.appendChild(cell1_3);
        row1.appendChild(cell1_4);
        row1.appendChild(cell1_5);
        // テーブルに行を追加
        table.appendChild(row1);
        // テーブルをHTMLの特定の要素に追加する
        const targetElement = document.getElementById("all_table_origin");
        targetElement.appendChild(table);

        //回答の内容を初期化
        document.getElementById("tempWord_ALL").innerHTML = ""

        //再定義
        var tableElem = document.getElementById('all_table');

        for(var i=0; i<rangenum_rear -rangenum_front +1; i++){
            // tbody要素にtr要素（行）を最後に追加
            var trElem = tableElem.insertRow(-1);

            // 単語番号
            var word_num = document.getElementById("words_table").rows[i +rangenum_front].cells[0].innerHTML;
            // 単語
            if(type == "E-J"){
                var word_question = document.getElementById("words_table").rows[i +rangenum_front].cells[1].innerHTML;
            }else{
                var word_question = document.getElementById("words_table").rows[i +rangenum_front].cells[2].innerHTML;
            }
                // 回答作成
            if(type == "E-J"){
                document.getElementById("tempWord_ALL").innerHTML = `${document.getElementById("tempWord_ALL").innerHTML + document.getElementById("words_table").rows[i +rangenum_front].cells[2].innerHTML},`;
            }else{
                document.getElementById("tempWord_ALL").innerHTML = `${document.getElementById("tempWord_ALL").innerHTML + document.getElementById("words_table").rows[i +rangenum_front].cells[1].innerHTML},`;
            }
            // td要素を追加,td要素にテキストを追加
            var cellElem_1 = trElem.insertCell(0).innerHTML = i+1;
            var cellElem_2 = trElem.insertCell(1).innerHTML = word_num;
            var cellElem_3 = trElem.insertCell(2).innerHTML = word_question;
            var cellElem_4 = trElem.insertCell(3).innerHTML = '<button class="all_displayButton" onclick="make_answer_specific('+i+')"><nobr>表示</nobr></button>';
            var cellElem_5 = trElem.insertCell(4).setAttribute("class","all_answer");
        }

        //回答表示ボタンを初期化
        document.getElementById("many_answer_button").innerHTML = "回答を表示";

        //ページの先頭へ
        scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
}

function make_answer_ALL(){
    var deta = document.getElementById("tempWord_ALL").innerHTML;

    if (deta != "") {
        if (document.getElementById("many_answer_button").innerHTML == "回答を表示") {
            let deta_array = deta.split(",")
            console.log(deta_array);

            for (let i = 0; i < document.getElementById("all_table").rows.length -1; i++) {
                document.getElementsByClassName("all_answer")[i].innerHTML = deta_array[i];
                document.getElementsByClassName("all_displayButton")[i].innerHTML = "<nobr>非表示</nobr>";
            }

            document.getElementById("many_answer_button").innerHTML = "回答を非表示";
        } else if (document.getElementById("many_answer_button").innerHTML == "回答を非表示") {
            for (let i = 0; i < document.getElementById("all_table").rows.length -1; i++) {
                document.getElementsByClassName("all_answer")[i].innerHTML = "";
                document.getElementsByClassName("all_displayButton")[i].innerHTML = "<nobr>表示</nobr>";
            }
            document.getElementById("many_answer_button").innerHTML = "回答を表示";
        }
    } else {
        document.getElementsByClassName("all_answer")[0].innerHTML = "問題を作成してください";
    }
}

function make_answer_specific(i){
    var deta = document.getElementById("tempWord_ALL").innerHTML;

    if (deta != "") {
        if (document.getElementById("many_answer_button").innerHTML == "回答を表示") {
            let deta_array = deta.split(",")
            console.log(deta_array);

            document.getElementsByClassName("all_answer")[i].innerHTML = deta_array[i];
            document.getElementsByClassName("all_displayButton")[i].innerHTML = "<nobr>非表示</nobr>";

        } else if (document.getElementById("many_answer_button").innerHTML == "回答を非表示") {
            document.getElementsByClassName("all_answer")[i].innerHTML = "";
            document.getElementsByClassName("all_displayButton")[i].innerHTML = "<nobr>表示</nobr>";
        }
    } else {
        document.getElementsByClassName("all_answer")[0].innerHTML = "問題を作成してください";
    }
}

document.addEventListener('keypress', keypress_ivent);
function keypress_ivent(e) {
    //現在開いているページ名を取得
    var setpage = document.getElementById("setpage").innerHTML;

    if(e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' 
    || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9'){ //回答の表示・非表示(問題ごと)
        if(setpage == "E-J"){
            make_answer_specify_EJ(e.key-1);
        }else if(setpage == "J-E"){
            make_answer_specify_JE(e.key-1);
        }
    }else if(e.key === '0'){ //回答の表示・非表示(問題ごと)
        if(setpage == "E-J"){
            make_answer_specify_EJ(9);
        }else if(setpage == "J-E"){
            make_answer_specify_JE(9);
        }
    }else if(e.key === 'a' || e.key === 'A'){ //回答の表示・非表示
        if(setpage == "E-J"){
            make_answer_EJ();
        }else if(setpage == "J-E"){
            make_answer_JE();
        }else if(setpage == "many"){
            make_answer_ALL();
        }
    }else if(e.key === 'q' || e.key === 'Q'){ //問題の作成
        if(setpage == "E-J"){
            make_question_EJ();
        }else if(setpage == "J-E"){
            make_question_JE();
        }else if(setpage == "many"){
            make_question_ALL();
        }
    }else if(e.key === 'r' || e.key === 'R'){ //降順・昇順の設定
        if(setpage == "E-J"){
            if(document.getElementsByName("E-J_random_checkbox")[0].checked == true){
                document.getElementsByName("E-J_random_checkbox")[0].checked = false
            }else{
                document.getElementsByName("E-J_random_checkbox")[0].checked = true
            }
        }else if(setpage == "J-E"){
            if(document.getElementsByName("J-E_random_checkbox")[0].checked == true){
                document.getElementsByName("J-E_random_checkbox")[0].checked = false
            }else{
                document.getElementsByName("J-E_random_checkbox")[0].checked = true
            }
        }else if(setpage == "many"){
            if(document.getElementsByName("many_random_checkbox")[0].checked == true){
                document.getElementsByName("many_random_checkbox")[0].checked = false
            }else{
                document.getElementsByName("many_random_checkbox")[0].checked = true
            }
        }
    }
    return false; 
}
