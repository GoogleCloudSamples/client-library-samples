// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START speech_v1p1beta1_speech_recognize]
'use strict';

const {SpeechClient} = require('@google-cloud/speech');
const {status} = require('@grpc/grpc-js');

const client = new SpeechClient();

/**
 * Transcribes audio from a Cloud Storage file using synchronous speech recognition.
 */
async function recognize() {
  try {
    const audio = {
      uri: 'gs://cloud-samples-data/speech/brooklyn_bridge.raw',
    };
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    };

    const request = {
      audio: audio,
      config: config,
    };

    const [response] = await client.recognize(request);

    for (const result of response.results) {
      console.log(`Transcript: ${result.alternatives[0].transcript}`);
      console.log(`Confidence: ${result.alternatives[0].confidence}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Audio source not found: ${err.message}`);
    } else {
      console.error(`Recognition request failed: ${err.message}`);
    }
  }
}

module.exports = { recognize };
// [END speech_v1p1beta1_speech_recognize]
