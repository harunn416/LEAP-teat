function make_question() {
    start()

    var rangenum_front = document.getElementById("rangenum_front").value;
    var rangenum_rear = document.getElementById("rangenum_rear").value;

    if (rangenum_front == "") { rangenum_front = 1 };
    if (rangenum_rear == "") { rangenum_rear == "" };

    const URL = "https://script.google.com/macros/s/AKfycbzCT49_zATikykJ3i-QLU4GACW3utbtBiQi1GpnjJdSTygKLOwfGN83t4pTHcT7CIRz/exec";

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

    var deta = document.getElementById("tempWord").innerHTML;

    if (deta != "") {
        let temp_deta_array = deta.split(",")

        let deta_array = []
        for (var i = 0; i < temp_deta_array.length; i++) {
            deta_array.push([temp_deta_array[3 * i], temp_deta_array[3 * i + 1], temp_deta_array[3 * i + 2]]);
        }
        console.log(deta_array)

        for (let i = 0; i < 10; i++) {
            document.getElementsByClassName("wordNum")[i].innerHTML = deta_array[i][0];
            document.getElementsByClassName("question_text")[i].innerHTML = deta_array[i][2];
        }
    } else {
        document.getElementsByClassName("wordNum")[0].innerHTML = "読み込みが完了していません<BR>もう一度お試しください";
    }

    for (let i = 0; i < 10; i++) {
        document.getElementsByClassName("answer")[i].innerHTML = "";
    }
    document.getElementById("answer_button").innerHTML = "回答を表示"
}

function make_answer() {
    var deta = document.getElementById("tempWord").innerHTML;

    if (deta != "") {
        if (document.getElementById("answer_button").innerHTML == "回答を表示") {
            let temp_deta_array = deta.split(",")

            let deta_array = []
            for (var i = 0; i < temp_deta_array.length; i++) {
                deta_array.push([temp_deta_array[3 * i], temp_deta_array[3 * i + 1], temp_deta_array[3 * i + 2]]);
            }
            console.log(deta_array)

            for (let i = 0; i < 10; i++) {
                document.getElementsByClassName("answer")[i].innerHTML = deta_array[i][1];
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


function start() {
    //main要素の先頭tempWordにfetchで取得した単語を入れておく
    const URL = "https://script.google.com/macros/s/AKfycbzCT49_zATikykJ3i-QLU4GACW3utbtBiQi1GpnjJdSTygKLOwfGN83t4pTHcT7CIRz/exec";

    fetch(URL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            render_text = data.message;
            document.getElementById("tempWord").innerHTML = render_text;
        })
        .catch(error => {
            document.getElementById("tempWord").innerHTML = error;
        });
}

function OnPost() {

    const URL = "https://script.google.com/macros/s/AKfycbzCT49_zATikykJ3i-QLU4GACW3utbtBiQi1GpnjJdSTygKLOwfGN83t4pTHcT7CIRz/exec";

    let SendDATA = {
        "column_1": document.getElementById("column_1").value,
        "column_2": document.getElementById("column_2").value
    };
    let postparam = {
        "method": "POST",
        "mode": "no-cors",
        "Content-Type": "application/x-www-form-urlencoded",
        "body": JSON.stringify(SendDATA)
    };
    fetch(URL, postparam);
}
