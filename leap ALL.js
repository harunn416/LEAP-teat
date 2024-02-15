function start() {
    //単語の数を獲得
    var words_num = document.getElementById("words_table").rows.length -1
    //最初に単語一覧が格納されているテーブルの列番号を記録しておく
    document.getElementById("words_num").innerHTML = words_num
    console.log("単語の数",words_num)
    //checkの母数を変更する
    document.getElementById("points_mother").innerHTML = words_num

    //初めて利用(checkリスト,check数がない場合)はリストをローカルストレージに作成
    
    if(localStorage.getItem("check_list_leap")==null){
        //checkリストの作成
        var check_li = []
        //no check である0で埋める
        for(var i=0; i<words_num; i++){
            check_li.push(0)
        }
        //文字列に変換する
        var li_string = JSON.stringify(check_li);
        //ローカルストレージに格納する
        localStorage.setItem("check_list_leap", li_string)
        localStorage.setItem("check_num_leap", 0)
    }

    //表示中の現在のcheck数を書き換え
    document.getElementById("points").innerHTML = localStorage.getItem("check_num_leap")
}

function change_page(page_name) {
    for(var i=0; i<2; i++){
        document.getElementsByClassName("main")[i].style.display = "none";
    }

    document.getElementById(page_name).style.display = "";
    document.getElementById("setpage").innerHTML = page_name;
}

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

    //記録されている単語数(行数-1)を取得
    var word_num = document.getElementById("words_num").innerHTML;
    
    //範囲が空白の場合、はじめを1、終わりを最後(GAS上で空白"")にする　or　1以下の場合は全選択
    if (rangenum_front == "" || rangenum_front < 1) { rangenum_front = 1 };
    if (rangenum_rear == "" || rangenum_rear < 1) { rangenum_rear = word_num };
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

    //記録されている単語数(行数-1)を取得
    var word_num = document.getElementById("words_num").innerHTML;
    
    //範囲が空白の場合、はじめを1、終わりを最後(GAS上で空白"")にする　or　1以下の場合は全選択
    if (rangenum_front == "" || rangenum_front < 1) { rangenum_front = 1 };
    if (rangenum_rear == "" || rangenum_rear < 1) { rangenum_rear = word_num };
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
    //チェックリスト と チェック数 を取得
    var check_li = JSON.parse(localStorage.getItem("check_list_leap"))
    var check_num = Number(localStorage.getItem("check_num_leap"))

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

    if(rangenum_front == "" || rangenum_rear == ""){
        rangenum_front = 1 
        rangenum_rear = word_num
    }
    if(rangenum_front < 1 || rangenum_rear > word_num){alert("範囲は1~" + word_num + "の間に設定してください")}
    else if(rangenum_rear <= rangenum_front){alert("正しく範囲を入力してください")}
    else{
        //チェックが入ってたら範囲を記録
        rec_range(rangenum_front,rangenum_rear);

        //問題の順番の配列を作る
        var q_num_ary_base = []
        for(var i=1; i <= rangenum_rear-rangenum_front +1; i++){
            q_num_ary_base.push(i);
        }
        console.log("初期",q_num_ary_base)

        //配列内の値をランダムに変える。
        if(document.getElementsByName("many_random_checkbox")[0].checked == false){
            var q_num_ary_base_temp = [];
            while(q_num_ary_base.length >0){
                var random = Math.floor( Math.random() * (q_num_ary_base.length) );
                q_num_ary_base_temp.push(q_num_ary_base[random]);
                q_num_ary_base.splice(random,1);
            }
            //並び変えたものを置換
            console.log(q_num_ary_base_temp);
            q_num_ary_base = q_num_ary_base_temp
        }

        console.log("並び替え後",q_num_ary_base);
        
    //一度すべてを消して初期化

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
        const cell1_6 = document.createElement("th");
        cell1_6.innerHTML = "check";

        //1行目に追加
        row1.appendChild(cell1_1);
        row1.appendChild(cell1_2);
        row1.appendChild(cell1_3);
        row1.appendChild(cell1_4);
        row1.appendChild(cell1_5);
        row1.appendChild(cell1_6);
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
        if(document.getElementsByName("no_check_checkbox")[0].checked == true){
            console.log("no checkのみ")
            //個別の回答を作成するときに持たせる行番号を個別で指定
            var j = 0
            //挿入するテーブルの中身取得
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
                    var cellElem_4 = trElem.insertCell(3).innerHTML = '<button class="all_displayButton" onclick="make_answer_specific('+j+')"><nobr>表示</nobr></button>';
                    var cellElem_5 = trElem.insertCell(4).setAttribute("class","all_answer");
                    //checkボタンを決める
                    if(check_li[word_num-1]==0){
                        var cellElem_6 = trElem.insertCell(5).innerHTML = '<button class="check_button" onclick="change_check('+(word_num-1)+','+j+')">no ch</button>';
                    }else{
                        var cellElem_6 = trElem.insertCell(5).innerHTML = '<button class="check_button checked" onclick="change_check('+(word_num-1)+','+j+')">checked</button>';
                    }
                    
                    j = j+1
                }
            }
        }else{ //それぞれの行を作成
            //個別の回答を作成するときに持たせる行番号を個別で指定
            var j = 0
            //挿入するテーブルの中身取得
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
                var cellElem_4 = trElem.insertCell(3).innerHTML = '<button class="all_displayButton" onclick="make_answer_specific('+j+')"><nobr>表示</nobr></button>';
                var cellElem_5 = trElem.insertCell(4).setAttribute("class","all_answer");
                //checkボタンを決める
                if(check_li[word_num-1]==0){
                    var cellElem_6 = trElem.insertCell(5).innerHTML = '<button class="check_button" onclick="change_check('+(word_num-1)+','+j+')">no ch</button>';
                }else{
                    var cellElem_6 = trElem.insertCell(5).innerHTML = '<button class="check_button checked" onclick="change_check('+(word_num-1)+','+j+')">checked</button>';
                }
                j = j+1
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
    var check_li = JSON.parse(localStorage.getItem("check_list_leap"))
    var check_num = Number(localStorage.getItem("check_num_leap"))

    if(document.getElementsByClassName("check_button")[i].innerHTML == "no ch"){
        //それぞれ値変更
        check_li[word_num] = 1
        check_num = check_num + 1

        //保存する
            //文字列に変換する
            var li_string = JSON.stringify(check_li);
            //ローカルストレージに格納する
            localStorage.setItem("check_list_leap", li_string)
            localStorage.setItem("check_num_leap", check_num)
        
        //ボタン変更
        document.getElementsByClassName("check_button")[i].innerHTML = "checked"
        //クラス変更　(背景色をかえるため)
        document.getElementsByClassName("check_button")[i].classList.add("checked")

        //表示中の現在のcheck数を書き換え
        document.getElementById("points").innerHTML = localStorage.getItem("check_num_leap")
    }else{
        //それぞれ値変更
        check_li[word_num] = 0
        check_num = check_num - 1

        //保存する
            //文字列に変換する
            var li_string = JSON.stringify(check_li);
            //ローカルストレージに格納する
            localStorage.setItem("check_list_leap", li_string)
            localStorage.setItem("check_num_leap", check_num)
        
        //ボタン変更
        document.getElementsByClassName("check_button")[i].innerHTML = "no ch"
        //クラス変更　(背景色をかえるため)
        document.getElementsByClassName("check_button")[i].classList.remove("checked")

        //表示中の現在のcheck数を書き換え
        document.getElementById("points").innerHTML = localStorage.getItem("check_num_leap")
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
        localStorage.setItem("check_list_leap", li_string)
        localStorage.setItem("check_num_leap", 0)
        console.time("temp")
        //表示中の現在のcheck数を書き換え
        document.getElementById("points").innerHTML = localStorage.getItem("check_num_leap")

        //テーブル初期化
        document.getElementById('all_table').remove()
        //初期テーブル作成
        document.getElementById("all_table_origin").innerHTML = '<table class="Qtable" border="1" id="all_table"><tr><th>列<br>番号</th><th>単語<br>番号</th><th>問題</th><th>答え<br><nobr>表示</nobr></th><th>答え</th><th>check</th></tr></table>'
    }
}

function copy_check() {
    var data = JSON.parse(localStorage.getItem("check_list_leap"));
    var data_bace64 = change_bace2_to_64(data);

    document.getElementById("copyTarget").value = data_bace64
    document.getElementById("copybox").style.display = "";

    // コピー対象のテキストを選択する
    document.getElementById("copyTarget").select();

    // 選択しているテキストをクリップボードにコピーする
    document.execCommand("Copy");

    alert("コピーしました。こちらの文章を他端末に貼り付けることで、checkを共有できます。")
}

function appear_check() {
    document.getElementById("inputbox").style.display = "";
}

function input_check() {
    //確認
    var result = confirm("この端末の記録は削除され、新たに入力されたcheckが適応されます。その後、反映のためサイトを再読み込みさせます。それでもよろしいですか？")
    if(result){
        //入力されてる文字の内容取得
        var input_deta = document.getElementById("input_Target").value
        //配列に変換
        var array = change_bace64_to_2(input_deta)
        console.log("aa",array[0])
        //check数の計算
        var num = 0
        for(var i=0; i<array[0].length; i++){
            num = num + Number(array[0][i])
        }
        //更新
        localStorage.setItem("check_list_leap", JSON.stringify(array[0]))
        localStorage.setItem("check_num_leap", num)
        //再読み込み
        location.reload(true);
    }
    

}

function change_bace2_to_64(data) {  //引数:配列 返り値:文字列
    //ビット数を変更する際は、comp_text の数を 2^bit に変更すること。
    //var data = [0,0,0,0,0,0,0,0,0,0,0,0]
    console.log("aaa")
    var bit_num = 6
    var comp_text = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F'
                    ,'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '#', '%', '&', '*']
    var result = ""
    for(var i=0; i<Math.ceil(data.length/bit_num); i++){
        var text = ""
        //最後
        if(data.length-(i*bit_num)<bit_num){
            for(var j=0; j<data.length%bit_num; j++){
                text = text + data[i*bit_num+j]
            }
        }else{
            for(var j=0; j<bit_num; j++){
                text = text + data[i*bit_num+j]
            }
        }
    result = result + comp_text[parseInt(text,2)]
    }
    result = result + "/" + data.length
    console.log("bace 2 to 64 result :",result);
    return result
}

function change_bace64_to_2(data) {  //引数:文字列 返り値:配列 [2進数配列, 数]
    //ビット数を変更する際は、comp_text の数を 2^bit に変更すること。
    //var data = "5b/8"
    var bit_num = 6
    var data_ary = data.split("/")
    var comp_text = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F'
                    ,'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '#', '%', '&', '*']
    var text = ""
    for(var i=0; i<data_ary[0].length; i++){
        var for_text = comp_text.indexOf(data[i]).toString(2)
        var text_num = for_text.length
        //console.log("inum:",i," for_text:",for_text," wnum:",bit_num-text_num)
        //最後
        if(data_ary[0].length-i==1){
            for(var j=0; j<Number(data_ary[1])%bit_num-text_num; j++){
                for_text = "0" + for_text
                //console.log("jnum : ",j," text : ",for_text)
            }
        }else{
            for(var j=0; j<bit_num-text_num; j++){
                for_text = "0" + for_text
                //console.log("jnum : ",j," text : ",for_text)
            }
        }
        text = text + for_text
    }
    console.log("bace 64 to 2 result :",text.split(""));
    return [text.split("").map(Number), data_ary[1]]
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

function rec_range(min,max){
    sessionStorage.setItem("min",min);
    sessionStorage.setItem("max",max);
}

function get_range(){
    var min = sessionStorage.getItem("min")
    var max = sessionStorage.getItem("max")
    return([min,max])
}
