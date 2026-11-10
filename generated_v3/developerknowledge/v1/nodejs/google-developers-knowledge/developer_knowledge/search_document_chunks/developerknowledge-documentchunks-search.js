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

// [START developerknowledge_v1_developerknowledge_documentchunks_search]
'use strict';

const {DeveloperKnowledgeClient} = require('@google/developer-knowledge');
const {status} = require('@grpc/grpc-js');

const client = new DeveloperKnowledgeClient();

/**
 * Searches document chunks relevant to a developer query.
 *
 * @param {string} query - The search query across Google developer documentation. Must not exceed 500 characters.
 */
async function searchDocumentChunks(query) {
  try {
    const request = {
      query,
      pageSize: 5,
    };

    // Execute search with manual pagination disabled to prevent request quota exhaustion
    const [response] = await client.searchDocumentChunks(request, {
      autoPaginate: false,
    });

    const chunks = Array.isArray(response)
      ? response
      : response.documentChunks || [];

    console.log(`Retrieved ${chunks.length} document chunks.`);
    for (const chunk of chunks) {
      console.log(`Document chunk name: ${chunk.name}`);
      console.log(`Document URI: ${chunk.documentUri}`);
      if (chunk.content) {
        console.log(`Content snippet: ${chunk.content.slice(0, 100)}...`);
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid query parameter: ${err.message}`);
    } else if (err.code === status.RESOURCE_EXHAUSTED) {
      console.error(`Quota exceeded: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication error: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code) {
      console.error(`API error (${err.code}): ${err.message}`);
    } else {
      console.error(`Failed to search document chunks: ${err.message}`);
    }
  }
}

module.exports = { searchDocumentChunks };
// [END developerknowledge_v1_developerknowledge_documentchunks_search]
