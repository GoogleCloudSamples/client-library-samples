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

// [START generativelanguage_v1beta_generativeservice_stream_generate_content]
'use strict';

const {GenerativeServiceClient} = require('@google-ai/generativelanguage');
const {status} = require('@grpc/grpc-js');

const client = new GenerativeServiceClient();

/**
 * Use the streamGenerateContent method
 *
 * @param {string} modelId - The ID of the model to use (for example, 'gemini-1.5-flash'). Must be an existing model name.
 */
async function streamGenerateContent(modelId) {
  try {
    const model = `models/${modelId}`;
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: 'Write a short story about an astronaut discovering a hidden library on Mars.',
          },
        ],
      },
    ];

    const request = {
      model,
      contents,
    };

    const stream = client.streamGenerateContent(request);

    for await (const chunk of stream) {
      const parts = chunk.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.text) {
            process.stdout.write(part.text);
          }
        }
      }
    }
    console.log();
  } catch (err) {
    if (err.code !== undefined && Object.values(status).includes(err.code)) {
      console.error(`gRPC error [code ${err.code}]: ${err.details || err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { streamGenerateContent };
// [END generativelanguage_v1beta_generativeservice_stream_generate_content]
