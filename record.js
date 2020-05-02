// record.js is a custom module for handling the creation of an audio file from text (text-to-speech)
// this file will callout to the cloud text-to-speech api service provider

"use strict";

//required modules
const sdk = require("microsoft-cognitiveservices-speech-sdk"); //using speech resource on microsoft azure cloud
const tmp = require("tmp"); //temporary directory manager
const rp = require('request-promise'); //NOTE: 'request-promise' works in coordination with 'request', which is deprecated
const fs = require("fs");

//vars
//UPDATE THESE VARIABLES TO REFERENCE YOUR OWN KEY/REGION/FILEPATH
const subscriptionKey = process.env.AZURE_TTS_SUBSCRIPTION_KEY; //this is the microsoft cloud text-to-speech subscription key
const serviceRegion = process.env.AZURE_SERVICE_REGION; //this is the service region of your microsoft azure subscription
const fileLocation = process.env.FILE_PATH //this is the local directory where you want to store your newly created audio files


//get a list of available voices to use with the microsoft speech service
//this method makes two consecutive REST API calls to the microsoft cognitive speech service
async function getVoicesFromCloud(filePath) {
    //get access token
    const token_endpoint = 'https://' + serviceRegion + '.api.cognitive.microsoft.com/sts/v1.0/issueToken';
    let tokenOptions = {
        method: 'POST',
        uri: token_endpoint,
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    };

    var token = await rp(tokenOptions);

    let voicesOptions = {
        method: 'GET',
        baseUrl: 'https://' + serviceRegion + '.tts.speech.microsoft.com/',
        url: 'cognitiveservices/voices/list',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }

    var request = await rp(voicesOptions).on('response', (response) => {
        if (response.statusCode === 200) {
            response.pipe(fs.createWriteStream(filePath));
            console.log('File is ready');
        }
    });

    //console.log(request); // this will print the contents of the file to the console.
}

// synthesizeSpeechToFile accepts a string of text and generates an output .wav file
function synthesizeSpeechToFile(text) {
    //create temporary file
    const tmpFile = tmp.fileSync({ tmpdir: fileLocation , postfix: '.wav' }); //this is the file name/location where the synthesized audio file will be saved
                                                                            //tmp will create a random filename at the given tmpdir
                                                                            //microsoft uses .wav files as output - .wav is higher quality than .mp3 and better for editing/production
    
    const filePath = tmpFile.name; //this is the file path (ex: 'path/to/myFile.wav')

    //NOTE: you may wish to use 'fs' here to create/manage your destination .wav file
    //      you can do so in conjunction with or in place of 'tmp'

    // create the audio-config pointing to our stream and
    // the speech config specifying the language.
    var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filePath); //'filePath' provides the filepath of the .wav file (ex: 'my/path/to/myFile.wav')
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

    //create the speech synthesizer
    return new Promise((resolve, reject) => {
        var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        synthesizer.speakTextAsync(text, result => {
            if (result) {
                console.log(JSON.stringify(result));

                //add file to global (res.locals) audioFiles array
            }
            synthesizer.close();
            resolve(filePath); //return path of file
        }, error => {
            synthesizer.close();
            reject(error); //throw error
        });
    });

}

// synthesizeSpeechToAudioStream accepts a string of text and generates an output ArrayBuffer object
function synthesizeSpeechToAudioStream(text) {
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    //var audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput(); //fromDefaultSpeakerOutput is still in development by microsoft!

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    return new Promise((resolve, reject) => {
        synthesizer.speakTextAsync(text, result => {
            var audioData;

            if (result) {
                //capture audio ArrayBuffer data
                audioData = result.audioData;
                console.log(`Audio data byte size: ${audioData.byteLength}`);

                console.log(JSON.stringify(result));
            }
            synthesizer.close();

            //var audioBuffer = Buffer.from(audioData);

            resolve(audioData); // return audioData ArrayBuffer
        }, error => {
            synthesizer.close();
            reject(error); // throw error
        });
    });
}


//exported functions for use in other modules/classes
module.exports = {

    getVoices: function (filePath) { //file path is a String indicating where the .json voices file should be saved in relation to your project root
        console.log('running get voices');
        getVoicesFromCloud(filePath);
    },

    record: async function (text) {
        console.log('Recording!');

        let tmpFile = await synthesizeSpeechToFile(text);
        
        return tmpFile; //return the path of the 
    },

    play: async function (text) {
        console.log('Playing!');

        let audioData = await synthesizeSpeechToAudioStream(text);
        
        return audioData;
    }

};