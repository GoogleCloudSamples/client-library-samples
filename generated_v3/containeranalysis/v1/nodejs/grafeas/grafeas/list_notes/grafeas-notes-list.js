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

// [START containeranalysis_v1_grafeas_notes_list]
'use strict';

const {GrafeasClient} = require('@google-cloud/grafeas');
const {status} = require('@grpc/grpc-js');

const client = new GrafeasClient();

/**
 * Use the listNotes method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function listNotes(projectId) {
  try {
    const parent = client.projectPath(projectId);

    // Retrieve all notes for the specified project.
    const [notes] = await client.listNotes({
      parent,
    });

    console.log(`Retrieved ${notes.length} note(s).`);
    for (const note of notes) {
      console.log(`Note name: ${note.name}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Project not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
  }
}

module.exports = { listNotes };
// [END containeranalysis_v1_grafeas_notes_list]
