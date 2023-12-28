function start() {
    //単語の数を獲得
    var words_num = document.getElementById("words_table").rows.length -1
    //最初に単語一覧が格納されているテーブルの列番号を記録しておく
    document.getElementById("words_num").innerHTML = document.getElementById("words_table").rows.length -1
    console.log("単語の数",words_num)
    //checkの母数を変更する
    document.getElementById("points_mother").innerHTML = words_num

    //初めて利用(checkリスト,check数がない場合)はリストをローカルストレージに作成
    
    if(localStorage.getItem("check_list")==null){
        //checkリストの作成
        var check_li = []
        //no check である0で埋める
        for(var i=0; i<words_num; i++){
            check_li.push(0)
        }
        //文字列に変換する
        var li_string = JSON.stringify(check_li);
        //ローカルストレージに格納する
        localStorage.setItem("check_list", li_string)
        localStorage.setItem("check_num", 0)
    }

    //表示中の現在のcheck数を書き換え
    document.getElementById("points").innerHTML = localStorage.getItem("check_num")
}

function change_page(page_name) {
    for(var i=0; i<2; i++){
        document.getElementsByClassName("main")[i].style.display = "none";
    }

    document.getElementById(page_name).style.display = "";
    document.getElementById("setpage").innerHTML = page_name;
}

function make_question_ALL(type){
    console.time("make_time")
    //チェックリスト と チェック数 を取得
    var check_li = JSON.parse(localStorage.getItem("check_list"))
    var check_num = Number(localStorage.getItem("check_num"))

    // table要素を取得
    var tableElem = document.getElementById('all_table');

    //imputから範囲を取り出す
    var rangenum_front = document.getElementById("all_rangenum_front").value;
    var rangenum_rear = document.getElementById("all_rangenum_rear").value;

    //数字化
    rangenum_front = Number(rangenum_front);
    rangenum_rear = Number(rangenum_rear);

    //記録されている単語数(行数-1)を取得
    var word_num = document.getElementById("words_num").innerHTML;

    if(rangenum_front == ""){rangenum_front = 1}
    if(rangenum_rear == ""){rangenum_rear = word_num}
    
    if(rangenum_front < 1 || rangenum_rear > word_num){alert("範囲は1~"+word_num+"の間に設定してください")}
    else if(rangenum_rear <= rangenum_front){alert("正しく範囲を入力してください")}
    else{
        //問題の順番の配列を作る
        var q_num_ary_base = []
        for(var i=1; i <= rangenum_rear-rangenum_front +1; i++){
            q_num_ary_base.push(i);
        }

        //配列内の値をランダムに変える。
        if(document.getElementsByName("many_random_checkbox")[0].checked == false){
            var q_num_ary_base_temp = [];
            while(q_num_ary_base.length >0){
                var random = Math.floor( Math.random() * (q_num_ary_base.length) );
                q_num_ary_base_temp.push(q_num_ary_base[random]);
                q_num_ary_base.splice(random,1);
            }
            //並び変えたものを置換
            q_num_ary_base = q_num_ary_base_temp
        }
        
    //一度すべてを消して初期化

        //テーブルの初期化
        tableElem.remove();

        //Table作成
        var table = document.createElement("table");
        //色々な属性の付与
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
        //漢字を表示するか
        if(document.getElementsByName("many_kanzi_checkbox")[0].checked == true){
            var cell1_4 = document.createElement("th");
            cell1_4.innerHTML = "漢字";
            var cell1_5 = document.createElement("th");
            cell1_5.innerHTML = "答え<br>表示";
            var cell1_6 = document.createElement("th");
            cell1_6.innerHTML = "答え";
            var cell1_7 = document.createElement("th");
            cell1_7.innerHTML = "check";
        }else{
            var cell1_4 = document.createElement("th");
            cell1_4.innerHTML = "答え<br>表示";
            var cell1_5 = document.createElement("th");
            cell1_5.innerHTML = "答え";
            var cell1_6 = document.createElement("th");
            cell1_6.innerHTML = "check";
        }
        
        //1行目に追加
        row1.appendChild(cell1_1);
        row1.appendChild(cell1_2);
        row1.appendChild(cell1_3);
        row1.appendChild(cell1_4);
        row1.appendChild(cell1_5);
        row1.appendChild(cell1_6);
        if(document.getElementsByName("many_kanzi_checkbox")[0].checked == true){
            row1.appendChild(cell1_7);
        }

        // テーブルに行を追加
        table.appendChild(row1);
        // テーブルをHTMLの特定の要素に追加する
        const targetElement = document.getElementById("all_table_origin");
        targetElement.appendChild(table);

        //回答の内容を初期化
        document.getElementById("tempWord_ALL").innerHTML = ""

        //再定義
        var tableElem = document.getElementById('all_table');

        
        //no ch のみ出力する場合
        console.log(document.getElementsByName("no_check_checkbox")[0].checked == true)
        if(document.getElementsByName("no_check_checkbox")[0].checked == true){
            //それぞれの行を作成
            //個別の回答を作成するときに持たせる行番号を個別で指定
            var j = 0
            for(var i=0; i<rangenum_rear -rangenum_front +1; i++){
                // 単語番号
                var word_num = document.getElementById("words_table").rows[q_num_ary_base[i]+rangenum_front -1].cells[0].innerHTML;
                if(check_li[word_num-1]==0){
                    // tbody要素にtr要素（行）を最後に追加
                    var trElem = tableElem.insertRow(-1);

                    // 単語
                    if(type == "E-J"){
                        var word_question = document.getElementById("words_table").rows[q_num_ary_base[i]+rangenum_front -1].cells[1].innerHTML;
                    }else{
                        var word_question = document.getElementById("words_table").rows[q_num_ary_base[i]+rangenum_front -1].cells[2].innerHTML;
                    }
                    //漢字
                    if(document.getElementsByName("many_kanzi_checkbox")[0].checked == true){var kanzi = document.getElementById("words_table").rows[q_num_ary_base[i]+rangenum_front -1].cells[3].innerHTML;}
                    
                    // 回答作成
                    if(type == "E-J"){
                        document.getElementById("tempWord_ALL").innerHTML = `${document.getElementById("tempWord_ALL").innerHTML + document.getElementById("words_table").rows[q_num_ary_base[i]+rangenum_front -1].cells[2].innerHTML},`;
                    }else{
                        document.getElementById("tempWord_ALL").innerHTML = `${document.getElementById("tempWord_ALL").innerHTML + document.getElementById("words_table").rows[q_num_ary_base[i]+rangenum_front -1].cells[1].innerHTML},`;
                    }
                    
                    // td要素を追加,td要素にテキストを追加
                    var cellElem_1 = trElem.insertCell(0).innerHTML = i+1;
                    var cellElem_2 = trElem.insertCell(1).innerHTML = word_num;
                    var cellElem_3 = trElem.insertCell(2).innerHTML = word_question;
                    if(document.getElementsByName("many_kanzi_checkbox")[0].checked == true){
                        var cellElem_4 = trElem.insertCell(3).innerHTML = kanzi
                        var cellElem_5 = trElem.insertCell(4).innerHTML = '<button class="all_displayButton" onclick="make_answer_specific('+j+')"><nobr>表示</nobr></button>';
                        var cellElem_6 = trElem.insertCell(5).setAttribute("class","all_answer");
                        //checkボタンを決める
                        if(check_li[word_num-1]==0){
                            var cellElem_7 = trElem.insertCell(6).innerHTML = '<button class="check_button" onclick="change_check('+(word_num-1)+','+j+')">no ch</button>';
                        }else{
                            var cellElem_7 = trElem.insertCell(6).innerHTML = '<button class="check_button checked" onclick="change_check('+(word_num-1)+','+j+')">checked</button>';
                        }
                    }else{
                        var cellElem_4 = trElem.insertCell(3).innerHTML = '<button class="all_displayButton" onclick="make_answer_specific('+j+')"><nobr>表示</nobr></button>';
                        var cellElem_5 = trElem.insertCell(4).setAttribute("class","all_answer");
                        //checkボタンを決める
                        if(check_li[word_num-1]==0){
                            var cellElem_6 = trElem.insertCell(5).innerHTML = '<button class="check_button" onclick="change_check('+(word_num-1)+','+j+')">no ch</button>';
                        }else{
                            var cellElem_6 = trElem.insertCell(5).innerHTML = '<button class="check_button checked" onclick="change_check('+(word_num-1)+','+j+')">checked</button>';
                        }
                    }
                    j = j +1
                }

                
            }
        }else{
            //それぞれの行を作成
            for(var i=0; i<rangenum_rear -rangenum_front +1; i++){
                // tbody要素にtr要素（行）を最後に追加
                var trElem = tableElem.insertRow(-1);

                // 単語番号
                var word_num = document.getElementById("words_table").rows[q_num_ary_base[i]+rangenum_front -1].cells[0].innerHTML;
                // 単語
                if(type == "E-J"){
                    var word_question = document.getElementById("words_table").rows[q_num_ary_base[i]+rangenum_front -1].cells[1].innerHTML;
                }else{
                    var word_question = document.getElementById("words_table").rows[q_num_ary_base[i]+rangenum_front -1].cells[2].innerHTML;
                }
                //漢字
                if(document.getElementsByName("many_kanzi_checkbox")[0].checked == true){var kanzi = document.getElementById("words_table").rows[q_num_ary_base[i]+rangenum_front -1].cells[3].innerHTML;}
                
                // 回答作成
                if(type == "E-J"){
                    document.getElementById("tempWord_ALL").innerHTML = `${document.getElementById("tempWord_ALL").innerHTML + document.getElementById("words_table").rows[q_num_ary_base[i]+rangenum_front -1].cells[2].innerHTML},`;
                }else{
                    document.getElementById("tempWord_ALL").innerHTML = `${document.getElementById("tempWord_ALL").innerHTML + document.getElementById("words_table").rows[q_num_ary_base[i]+rangenum_front -1].cells[1].innerHTML},`;
                }
                
                // td要素を追加,td要素にテキストを追加
                var cellElem_1 = trElem.insertCell(0).innerHTML = i+1;
                var cellElem_2 = trElem.insertCell(1).innerHTML = word_num;
                var cellElem_3 = trElem.insertCell(2).innerHTML = word_question;
                if(document.getElementsByName("many_kanzi_checkbox")[0].checked == true){
                    var cellElem_4 = trElem.insertCell(3).innerHTML = kanzi
                    var cellElem_5 = trElem.insertCell(4).innerHTML = '<button class="all_displayButton" onclick="make_answer_specific('+i+')"><nobr>表示</nobr></button>';
                    var cellElem_6 = trElem.insertCell(5).setAttribute("class","all_answer");
                    //checkボタンを決める
                    if(check_li[word_num-1]==0){
                        var cellElem_7 = trElem.insertCell(6).innerHTML = '<button class="check_button" onclick="change_check('+(word_num-1)+','+i+')">no ch</button>';
                    }else{
                        var cellElem_7 = trElem.insertCell(6).innerHTML = '<button class="check_button checked" onclick="change_check('+(word_num-1)+','+i+')">checked</button>';
                    }
                }else{
                    var cellElem_4 = trElem.insertCell(3).innerHTML = '<button class="all_displayButton" onclick="make_answer_specific('+i+')"><nobr>表示</nobr></button>';
                    var cellElem_5 = trElem.insertCell(4).setAttribute("class","all_answer");
                    //checkボタンを決める
                    if(check_li[word_num-1]==0){
                        var cellElem_6 = trElem.insertCell(5).innerHTML = '<button class="check_button" onclick="change_check('+(word_num-1)+','+i+')">no ch</button>';
                    }else{
                        var cellElem_6 = trElem.insertCell(5).innerHTML = '<button class="check_button checked" onclick="change_check('+(word_num-1)+','+i+')">checked</button>';
                    }
                }
            }
        }

        //回答表示ボタンを初期化
        document.getElementById("many_answer_button").innerHTML = "回答を表示";

        //ページの先頭へ
        scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    console.timeEnd("make_time")
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
        if (document.getElementsByClassName("all_displayButton")[i].innerHTML == "<nobr>表示</nobr>") {
            let deta_array = deta.split(",")
            console.log(deta_array);

            document.getElementsByClassName("all_answer")[i].innerHTML = deta_array[i];
            document.getElementsByClassName("all_displayButton")[i].innerHTML = "<nobr>非表示</nobr>";

        } else if (document.getElementsByClassName("all_displayButton")[i].innerHTML == "<nobr>非表示</nobr>") {
            document.getElementsByClassName("all_answer")[i].innerHTML = "";
            document.getElementsByClassName("all_displayButton")[i].innerHTML = "<nobr>表示</nobr>";
        }
    } else {
        document.getElementsByClassName("all_answer")[0].innerHTML = "問題を作成してください";
    }
}

function change_check(word_num,i) {
    //ローカルストレージから各種値を取得
    var check_li = JSON.parse(localStorage.getItem("check_list"))
    var check_num = Number(localStorage.getItem("check_num"))

    if(document.getElementsByClassName("check_button")[i].innerHTML == "no ch"){
        //それぞれ値変更
        check_li[word_num] = 1
        check_num = check_num + 1

        //保存する
            //文字列に変換する
            var li_string = JSON.stringify(check_li);
            //ローカルストレージに格納する
            localStorage.setItem("check_list", li_string)
            localStorage.setItem("check_num", check_num)
        
        //ボタン変更
        document.getElementsByClassName("check_button")[i].innerHTML = "checked"
        //クラス変更　(背景色をかえるため)
        document.getElementsByClassName("check_button")[i].classList.add("checked")

        //表示中の現在のcheck数を書き換え
        document.getElementById("points").innerHTML = localStorage.getItem("check_num")
    }else{
        //それぞれ値変更
        check_li[word_num] = 0
        check_num = check_num - 1

        //保存する
            //文字列に変換する
            var li_string = JSON.stringify(check_li);
            //ローカルストレージに格納する
            localStorage.setItem("check_list", li_string)
            localStorage.setItem("check_num", check_num)
        
        //ボタン変更
        document.getElementsByClassName("check_button")[i].innerHTML = "no ch"
        //クラス変更　(背景色をかえるため)
        document.getElementsByClassName("check_button")[i].classList.remove("checked")

        //表示中の現在のcheck数を書き換え
        document.getElementById("points").innerHTML = localStorage.getItem("check_num")
    }
}

function clear_check() {
    if(confirm("checkを初期化しますがよろしいですか？  テーブルは一度削除されます。")==true){
        console.time("temp")
        //単語数取得
        var words_num = document.getElementById("points_mother").innerHTML
        //local storage から削除
        //checkリストの作成
        var check_li = []
        //no check である0で埋める
        for(var i=0; i<words_num; i++){
            check_li.push(0)
        }
        //文字列に変換する
        var li_string = JSON.stringify(check_li);
        //ローカルストレージに格納する
        localStorage.setItem("check_list", li_string)
        localStorage.setItem("check_num", 0)
        console.time("temp")
        //表示中の現在のcheck数を書き換え
        document.getElementById("points").innerHTML = localStorage.getItem("check_num")

        //テーブル初期化
        document.getElementById('all_table').remove()
        //初期テーブル作成
        document.getElementById("all_table_origin").innerHTML = '<table class="Qtable" border="1" id="all_table"><tr><th>列<br>番号</th><th>単語<br>番号</th><th>問題</th><th>漢字</th><th>答え<br><nobr>表示</nobr></th><th>答え</th><th>check</th></tr></table>'
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
