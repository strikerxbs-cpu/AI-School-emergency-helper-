// ==========================================
// ১. পপ-আপ ওপেন ও ক্লোজ করার ফাংশন
// ==========================================
function openEmergency(title, text) {
    var modal = document.getElementById("modal");
    var modalTitle = document.getElementById("modalTitle");
    var modalText = document.getElementById("modalText");
    
    if (modalTitle) modalTitle.innerText = title;
    if (modalText) modalText.innerText = text;
    if (modal) modal.style.display = "flex";
}

function closeEmergency() {
    var modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
    
    // পপ-আপ বন্ধ হলে ব্রাউজারের ভয়েস থামিয়ে দেওয়ার জন্য
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}

// ==========================================
// ২. কথা বলে সমস্যা জানান (Voice Input) ফাংশন
// ==========================================
function startSpeechRecognition() {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert("আপনার ব্রাউজারে ভয়েস ইনপুট সমর্থিত নয়। টাইপ করে চেষ্টা করুন।");
        return;
    }

    var recognition = new SpeechRecognition();
    recognition.lang = 'bn-BD';
    
    recognition.onresult = function(event) {
        var text = event.results[0][0].transcript;
        var inputField = document.getElementById("userInput") || document.querySelector("textarea") || document.querySelector("input[type='text']");
        if (inputField) {
            inputField.value = text;
        }
    };

    recognition.onerror = function() {
        alert("কথা বুঝতে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    };

    recognition.start();
}

// ==========================================
// ৩. Smart Help বাটন ট্রাইগার ফাংশন
// ==========================================
function triggerSmartHelp() {
    var inputField = document.getElementById("userInput") || document.querySelector("textarea") || document.querySelector("input[type='text']");
    var query = inputField ? inputField.value.trim() : "";
    
    if (query !== "") {
        openEmergency("জরুরি নির্দেশাবলী", query + " - এই ধরনের পরিস্থিতে শান্ত থাকুন, দ্রুত নিরাপদ স্থানে যান এবং সংশ্লিষ্ট কর্তৃপক্ষকে অবহিত করুন।");
    } else {
        alert("অনুগ্রহ করে আপনার সমস্যা লিখুন বা কথা বলে জানান।");
    }
}

// ==========================================
// ৪. নির্দেশনা শুনুন (Voice Output / TTS) ফাংশন
// ==========================================
function speakInstructions() {
    var modalTextElement = document.getElementById("modalText");
    if (!modalTextElement) return;
    
    var text = modalTextElement.innerText || modalTextElement.textContent;

    // (ক) অ্যাপ ইনভেন্টরে চললে সরাসরি TextToSpeech-এ পাঠাবে
    if (window.AppInventor) {
        window.AppInventor.setWebViewString(text);
    } 
    // (খ) সাধারণ ক্রোম বা অন্যান্য ব্রাউজারে চললে ব্রাউজারের ভয়েস চালু হবে
    else if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'bn-BD';
        window.speechSynthesis.speak(utterance);
    }
}

// ==========================================
// ৫. পপ-আপের বাইরে ক্লিক করলে পপ-আপ ক্লোজ করার কোড
// ==========================================
window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeEmergency();
    }
};
