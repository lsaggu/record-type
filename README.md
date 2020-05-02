# record-type
Node.js module for converting text to speech relying on Microsoft Cognitive Services Speech SDK.

## About
This module builds upon the [*Microsoft Cognitive Services Speech SDK for Javascript*](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk). The Microsoft Cognitive Services Speech SDK is a gateway for applications to use the [Microsoft Azure Speech Service](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/overview), which is "the unification of speech-to-text, text-to-speech, and speech-translation into a single Azure subscription."

The *record-type* module only leverages the **speech-to-text** capabilities of the service.

Developers are encouraged to explore the service and build/test/etc., as the Speech SDK is relatively new with many cool features still under development.

## Usage
This module currently offers two simple functions:
1. `play(text)` - Create an in-memory ArrayBuffer object from a string of *text*.
2. `record(text)` - Create a .wav file from a string of *text*.
3. `getVoices(filePath)` - Creates a .json file in the specified file (relative to project root directory) of the voices accessible via the Microsoft Azure Cognitive Services Speech SDK

### Prerequisites
In order to make use of this module, the following must be true:
- You intend to use this module in a *node.js* application.
- You possess a Microsoft Azure subscription.
    - Create your [free Azure account](https://azure.microsoft.com/en-us/free/)
- You have set up a *Speech* Resource within your Microsoft Azure subscription 
    - See this article to [setup the Speech Service](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/get-started) within your Microsoft Azure Subscription.

### Installation
1. Clone this repository into a local directory.
2. Move/Add the newly created, local *record-type* directory into the *Modules* directory of your **node.js** project:

    ```
        root
        |
        |-- bin/
        |-- modules/        # Move to this folder (as shown)
        |   |
        |   |-- record-type/
        |       |
        |       |-- record.js
        |       |-- package.json
        |       |-- README.md
        |       |-- LICENSE
        |
        |-- node_modules/   # Or move here
        |-- public/
        |-- routes/
        |-- views/
        |-- app.js
        |-- package.json
        |-- package-lock.json
        |-- README.md
    ```

3. Update the package variables
    - Update environment variables within the *record.js* file to reference your own **Subscription Key**, **Service Region**, and desired **File Location**.
    
    ```javascript
    //UPDATE THESE VARIABLES TO REFERENCE YOUR OWN KEY/REGION/FILEPATH
    const subscriptionKey = process.env.AZURE_TTS_SUBSCRIPTION_KEY; //this is the microsoft cloud text-to-speech subscription key
    const serviceRegion = process.env.AZURE_SERVICE_REGION; //this is the service region of your microsoft azure subscription
    const fileLocatoin = process.env.FILE_PATH //this is the local directory where you want to store your newly created audio files
    ```    

4. Save the *record.js* file.

5. From your node.js project root directory, install the *record-type* module:
    ```
    npm install ./<route-to-module>/record-type
    ```

6. You should be able to reference the module in your own classes/modules: 
    ```
    const record-type = require('record-type');
    ```

## Resources

- [Basics of Speech Synthesis with Microsoft Speech Service SDK](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/text-to-speech-basics?tabs=import&pivots=programming-language-javascript#synthesize-to-speaker-output)
- [Request npm package is deprecated](https://www.npmjs.com/package/request)
- [Request-Promise npm package](https://www.npmjs.com/package/request-promise)