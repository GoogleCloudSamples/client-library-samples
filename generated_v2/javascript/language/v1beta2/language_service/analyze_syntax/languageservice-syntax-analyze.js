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

// [START language_v1beta2_languageservice_analyze_syntax]
'use strict';

const {LanguageServiceClient} = require('@google-cloud/language');
const {status} = require('@grpc/grpc-js');

const client = new LanguageServiceClient();

/**
 * Analyzes the syntax of a text document.
 */
async function analyzeSyntax() {
  try {
    const document = {
      content:
        'Google, headquartered in Mountain View, unveiled the new Android phone at the Consumer Electronics Show.',
      type: 'PLAIN_TEXT',
    };
    const encodingType = 'UTF8';

    const request = {
      document,
      encodingType,
    };

    const [response] = await client.analyzeSyntax(request);

    console.log(`Language: ${response.language}`);
    console.log(`Total sentences: ${response.sentences.length}`);
    for (const sentence of response.sentences) {
      console.log(`Sentence: ${sentence.text.content}`);
    }

    console.log(`Total tokens: ${response.tokens.length}`);
    for (const token of response.tokens) {
      console.log(`Token: ${token.text.content} (${token.partOfSpeech.tag})`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API request failed: ${err.message}`);
    }
  }
}

module.exports = { analyzeSyntax };
// [END language_v1beta2_languageservice_analyze_syntax]
