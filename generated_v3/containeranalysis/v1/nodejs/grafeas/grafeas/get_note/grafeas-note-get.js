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

// [START containeranalysis_v1_grafeas_note_get]
'use strict';

const {GrafeasClient} = require('@google-cloud/grafeas');
const {status} = require('@grpc/grpc-js');

const client = new GrafeasClient();

/**
 * Use the getNote method
 *
 * @param {string} providerId - ID of the Provider (for example, 'example-provider-id')
 * @param {string} noteId - ID of the Note (for example, 'example-note-id')
 */
async function getNote(providerId, noteId) {
  try {
    const name = client.notePath(providerId, noteId);
    const [note] = await client.getNote({name});

    console.log(`Note name: ${note.name}`);
    return note;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Note not found: ${err.message}`);
    } else {
      console.error(`Error retrieving note: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getNote };
// [END containeranalysis_v1_grafeas_note_get]
