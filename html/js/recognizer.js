"use strict";

var recognition = null;
var recognizing = false;
var final_transcript = "";
var interim_transcript = "";
if (!('webkitSpeechRecognition' in window)) {
    upgrade();
} else {
    console.log("Firing up speech recognition");
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onstart = function() {
        recognizing = true;
        
        recognition.interim_span.innerText ="";
        recognition.final_span = final_span;
        final_transcript = recognition.final_span.value;
        interim_transcript = final_transcript;
        console.log("Speech recognition started...");
        var msg = new SpeechSynthesisUtterance('Listening, speak when ready.');
        window.speechSynthesis.speak(msg);
        //showInfo('info_speak_now');
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error: ",event);
        if (event.error == 'no-speech') {
            //showInfo('info_no_speech');
            ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
            //showInfo('info_no_microphone');
            ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
            if (event.timeStamp - start_timestamp < 100) {
                //showInfo('info_blocked');
            } else {
                //showInfo('info_denied');
            }
            ignore_onend = true;
        }
        window.alert("Speech Recognition Error: "+event.error);
    };

    recognition.onresult = function(event) {
        //console.log("Speech recognition found a part of speech: ",event);
        var interim_transcript = '';
        if (typeof(event.results) == 'undefined') {
            recognition.onend = null;
            recognition.stop();
            return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        final_transcript = capitalize(final_transcript);
        recognition.final_span.value = linebreak(final_transcript);
        recognition.interim_span.innerText = linebreak(interim_transcript);
    };

    recognition.onend = function() {
        recognizing = false;
        recognition.interim_span.innerText="";
        console.log("Speech recognition is complete: ",recognition.final_span.value);
        console.log("Area is: ",recognition.final_span);
        var msg = new SpeechSynthesisUtterance('Okay, replaying message.');
        window.speechSynthesis.speak(msg);
        var msg = new SpeechSynthesisUtterance(recognition.final_span.value);
        window.speechSynthesis.speak(msg);
        /*
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
            var range = document.createRange();
            range.selectNode(document.getElementsByName('body')[0]);
            window.getSelection().addRange(range);
        }
        */
        recognition.final_span = null;
    };
    var msg = new SpeechSynthesisUtterance('Commander Steem reporting for duty!');
    window.speechSynthesis.speak(msg);
}
