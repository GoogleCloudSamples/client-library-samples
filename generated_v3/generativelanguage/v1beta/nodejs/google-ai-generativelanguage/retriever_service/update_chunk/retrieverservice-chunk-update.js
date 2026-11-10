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

// [START generativelanguage_v1beta_retrieverservice_chunk_update]
'use strict';

const {RetrieverServiceClient} = require('@google-ai/generativelanguage').v1beta;
const {status} = require('@grpc/grpc-js');

const client = new RetrieverServiceClient();

/**
 * Updates an existing chunk in a document.
 */
async function updateChunk() {
  try {
    const chunk = {
      name: 'corpora/example-corpus-id/documents/example-document-id/chunks/example-chunk-id',
      data: {
        stringValue: 'Updated chunk text content for indexing.',
      },
    };
    const updateMask = {
      paths: ['data.string_value'],
    };

    const request = {
      chunk,
      updateMask,
    };

    const [response] = await client.updateChunk(request);
    console.log(`Updated Chunk Name: ${response.name}`);
    console.log(`Chunk State: ${response.state}`);
  } catch (err) {
    if (err.code !== undefined && Object.values(status).includes(err.code)) {
      console.error(`Google API RPC Error [Code ${err.code}]: ${err.details || err.message}`);
    } else {
      console.error('Unexpected error updating chunk:', err);
    }
  }
}

module.exports = { updateChunk };
// [END generativelanguage_v1beta_retrieverservice_chunk_update]
