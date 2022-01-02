// Retrieve Elements
const resetCodeBtn   = document.querySelector('.editor__reset');
const lang = document.getElementById('lang').value;

// Setup Ace
let codeEditor = ace.edit("code");
let defaultCode = '';

let editorLib = {
    // Configure Ace
    init() {
        // Set Theme
        codeEditor.setTheme("ace/theme/tomorrow_night");

        // Set language
        if (lang == 'C' || lang == 'C++')
            codeEditor.session.setMode("ace/mode/c_cpp");
        else if (lang == 'Java')
            codeEditor.session.setMode("ace/mode/javascript");
        else if (lang == 'Python')
            codeEditor.session.setMode("ace/mode/python");

        // Set Options
        codeEditor.setOptions({
            fontSize: '12pt',
            enableLiveAutocompletion: true,
        });

        // Set Default Code
        codeEditor.setValue(defaultCode);
    }
}

resetCodeBtn.addEventListener('click', () => {
    // Clear ace editor
    codeEditor.setValue(defaultCode);
})

editorLib.init();