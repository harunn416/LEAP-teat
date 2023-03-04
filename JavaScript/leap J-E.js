function make_question() {

    //imputから範囲を取り出す
    var rangenum_front = document.getElementById("rangenum_front").value;
    var rangenum_rear = document.getElementById("rangenum_rear").value;
    
    //範囲が空白の場合、はじめを1、終わりを最後(GAS上で空白"")にする
    if (rangenum_front == "") { rangenum_front = 1 };
    if (rangenum_rear == "") { rangenum_rear == "" };

    var URL = "https://script.google.com/macros/s/AKfycbzCT49_zATikykJ3i-QLU4GACW3utbtBiQi1GpnjJdSTygKLOwfGN83t4pTHcT7CIRz/exec";

    let SendDATA = {
        "rangenum_front": rangenum_front,
        "rangenum_rear": rangenum_rear,
    };
    let postparam = {
        "method": "POST",
        "mode": "no-cors",
        "Content-Type": "application/x-www-form-urlencoded",
        "body": JSON.stringify(SendDATA)
    };
    fetch(URL, postparam);

    //main要素の先頭tempWordにfetchで取得した単語を入れておく
    var URL = "https://script.google.com/macros/s/AKfycbzCT49_zATikykJ3i-QLU4GACW3utbtBiQi1GpnjJdSTygKLOwfGN83t4pTHcT7CIRz/exec";

    fetch(URL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            render_text = data.message;
            console.log(render_text);
            
            document.getElementById("tempWord").innerHTML = ""
            for (let i = 0; i < 10; i++) {
                document.getElementsByClassName("wordNum")[i].innerHTML = render_text[i][0];
                document.getElementsByClassName("question_text")[i].innerHTML = render_text[i][2];
                document.getElementById("tempWord").innerHTML = `${document.getElementById("tempWord").innerHTML + render_text[i][1]},`
            }
        })
        .catch(error => {
            document.getElementById("wordNum").innerHTML = error;
        });

    for (let i = 0; i < 10; i++) {
        document.getElementsByClassName("answer")[i].innerHTML = "";
    }
    document.getElementById("answer_button").innerHTML = "回答を表示"
}

function make_answer() {
    var deta = document.getElementById("tempWord").innerHTML;

    if (deta != "") {
        if (document.getElementById("answer_button").innerHTML == "回答を表示") {
            let deta_array = deta.split(",")
            console.log(deta_array)

            for (let i = 0; i < 10; i++) {
                document.getElementsByClassName("answer")[i].innerHTML = deta_array[i];
            }

            document.getElementById("answer_button").innerHTML = "回答を非表示"
        } else if (document.getElementById("answer_button").innerHTML == "回答を非表示") {
            for (let i = 0; i < 10; i++) {
                document.getElementsByClassName("answer")[i].innerHTML = "";
            }
            document.getElementById("answer_button").innerHTML = "回答を表示";
        }
    } else {
        document.getElementsByClassName("answer")[0].innerHTML = "問題を作成してください";
    }
}