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

### Prerequisites
In order to make use of this module, the following must be true:
- You intend to use this module in a *node.js* application.
- You possess a Microsoft Azure subscription.
    - Create your [free Azure account](https://azure.microsoft.com/en-us/free/)
- You have set up a *Speech* Resource within your Microsoft Azure subscription 
    - See this article to [setup the Speech Service](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/get-started) within your Microsoft Azure Subscription.

### Installation

## Resources
