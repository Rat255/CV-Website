// script.js
const htmlInput = document.getElementById('html');
const cssInput = document.getElementById('css');
const jsInput = document.getElementById('js');
const previewFrame = document.getElementById('preview');

const htmlSuggestions = document.getElementById('html-suggestions');
const cssSuggestions = document.getElementById('css-suggestions');
const jsSuggestions = document.getElementById('js-suggestions');


const htmlWords = ['<!DOCTYPE html>', '<html>', '<head>', '<body>', '<h1>', '<p>', '<div>', '<span>', '<a>', '<img>', '<script>', '<style>'];
const cssWords = ['color', 'background', 'font-size', 'margin', 'padding', 'border', 'display', 'position', 'width', 'height'];
const jsWords = ['console.log()', 'document.getElementById()', 'addEventListener()', 'querySelector()', 'setTimeout()', 'fetch()', 'Array', 'Object', 'Promise'];

function updatePreview() {
    const html = htmlInput.value;
    const css = `<style>${cssInput.value}</style>`;
    const js = jsInput.value;

    const previewContent = `
        ${html}
        ${css}
        <script>
            try {
                ${js}
            } catch (e) {
                console.error(e);
            }
        </script>
    `;

    const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    previewDoc.open();
    previewDoc.write(previewContent);
    previewDoc.close();
}


function showSuggestions(input, suggestionsElement, words) {
    const value = input.value;
    suggestionsElement.innerHTML = '';
    if (value) {
        const filteredWords = words.filter(word => word.startsWith(value));
        if (filteredWords.length > 0) {
            suggestionsElement.style.display = 'block';
            filteredWords.forEach(word => {
                const suggestionDiv = document.createElement('div');
                suggestionDiv.textContent = word;
                suggestionDiv.onclick = () => {
                    input.value = word + ' ';
                    suggestionsElement.style.display = 'none';
                    input.focus();
                    updatePreview();
                };
                suggestionsElement.appendChild(suggestionDiv);
            });
        } else {
            suggestionsElement.style.display = 'none';
        }
    } else {
        suggestionsElement.style.display = 'none';
    }
}


htmlInput.addEventListener('input', () => {
    showSuggestions(htmlInput, htmlSuggestions, htmlWords);
    updatePreview();
});
cssInput.addEventListener('input', () => {
    showSuggestions(cssInput, cssSuggestions, cssWords);
    updatePreview();
});
jsInput.addEventListener('input', () => {
    showSuggestions(jsInput, jsSuggestions, jsWords);
    updatePreview();
});


document.addEventListener('click', (e) => {
    if (!e.target.closest('.input-container')) {
        htmlSuggestions.style.display = 'none';
        cssSuggestions.style.display = 'none';
        jsSuggestions.style.display = 'none';
    }
});

 
    function showMobileWarning() {
        const mobileWarning = document.getElementById("mobile-warning");
        if (mobileWarning) {
            if (window.innerWidth <= 900 || window.innerHeight <= 550) {
                mobileWarning.style.display = "flex"; // Show the warning
            } else {
                mobileWarning.style.display = "none"; // Hide the warning
            }
        } else {
            console.log("Element with ID 'mobile-warning' not found.");
        }
    }
    
    // Run on page load
    showMobileWarning();

    // Run on window resize to check if the warning should be shown or hidden
    window.addEventListener('resize', showMobileWarning);
