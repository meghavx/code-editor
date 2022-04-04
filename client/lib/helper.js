function resetCode() {
    document.getElementById("output").innerText = "";
    document.getElementById("input").value = "";
    document.getElementById("checkbox").checked = false;
}

function runCode() {
    
    let lang = document.getElementById('lang').value;
    let code = document.getElementById('code').innerText;

    if (lang === 'C' || lang === 'C++') {
        code = code.slice(code.indexOf('#include'));
    }
    else if (lang === 'Java') {
        if (code.includes('import')) {
            code = code.slice(code.indexOf('import'),code.lastIndexOf('}') + 1);
        }
        else {
            if (code.includes('public')) {
                code = code.slice(code.indexOf('public'),code.lastIndexOf('}') + 1);
            }
            else {
                code = code.slice(code.indexOf('class'),code.lastIndexOf('}') + 1);
            }
        }
    }

    let input = document.getElementById('input').value;
    let inputCheck = 'false';
    let selected = document.querySelector("input[type='checkbox']:checked")
    
    if (selected !== null) {
        inputCheck = 'true';
    }
    let data = {
        code : code,
        input : input, 
        lang : lang,
        inputCheck : inputCheck
    }

    fetch('http://localhost:8080/compilecode', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => {
        let outputValue;
        if (json.output != null) {
            outputValue = json.output;
        }
        else if (json.error != null) {
            outputValue = json.error;
        }
        else {
            outputValue = json;
        }
        let output = document.getElementById('output');
        
        output.innerText = outputValue;
        console.log(outputValue);
    })
    .catch(err => console.log(err));
}
