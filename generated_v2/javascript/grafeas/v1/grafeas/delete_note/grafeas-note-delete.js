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

// [START containeranalysis_v1_grafeas_note_delete]
'use strict';

const {GrafeasClient} = require('@google-cloud/grafeas');
const {status} = require('@grpc/grpc-js');

const client = new GrafeasClient();

/**
 * Use the deleteNote method
 *
 * @param {string} projectId - The Google Cloud project ID of the provider project storing the note.
 * @param {string} noteId - The ID of the note to delete (for example, 'example-note-id').
 */
async function deleteNote(projectId, noteId) {
  try {
    const name = `projects/${projectId}/notes/${noteId}`;

    await client.deleteNote({name});
    console.log(`Deleted note: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Note not found for note ID ${noteId} in project ${projectId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while attempting to delete note: ${noteId}`);
    } else {
      console.error(`Failed to delete note: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteNote };
// [END containeranalysis_v1_grafeas_note_delete]
