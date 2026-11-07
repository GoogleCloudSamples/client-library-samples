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

// [START speech_v1_speech_long_running_recognize]
'use strict';

const {SpeechClient} = require('@google-cloud/speech');
const {status} = require('@grpc/grpc-js');

const client = new SpeechClient();

/**
 * Use the longRunningRecognize method
 *
 */
async function longRunningRecognize() {
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
      audio,
      config,
    };

    const [operation] = await client.longRunningRecognize(request);
    const [response] = await operation.promise();

    for (const result of response.results) {
      console.log(`Transcription: ${result.alternatives[0].transcript}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error (${err.code}): ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { longRunningRecognize };
// [END speech_v1_speech_long_running_recognize]
