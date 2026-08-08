// Emergency Popup
function openEmergency(title, text) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalText").innerText = text;
    document.getElementById("modal").style.display = "flex";
}

function closeEmergency() {
    document.getElementById("modal").style.display = "none";
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}

// Voice Output Function
function speakInstructions() {
    var modalTextElement = document.getElementById("modalText");
    if (!modalTextElement) return;
    
    var text = modalTextElement.innerText || modalTextElement.textContent;

    // ১. অ্যাপ ইনভেন্টরের জন্য
    if (window.AppInventor) {
        window.AppInventor.setWebViewString(text);
    } 
    // ২. সাধারণ ব্রাউজারের জন্য
    else if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'bn-BD';
        window.speechSynthesis.speak(utterance);
    }
}

// Click Outside Modal to Close
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeEmergency();
    }
};
