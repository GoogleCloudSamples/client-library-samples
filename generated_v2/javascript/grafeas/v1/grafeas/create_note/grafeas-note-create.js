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

// [START containeranalysis_v1_grafeas_note_create]
'use strict';

const {GrafeasClient} = require('@google-cloud/grafeas');
const {status} = require('@grpc/grpc-js');

const client = new GrafeasClient();

/**
 * Use the createNote method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} noteId - Caller-chosen ID for the Note (for example, 'example-note'). Documented format uses lowercase letters, numbers, and hyphens.
 */
async function createNote(projectId, noteId) {
  try {
    const parent = `projects/${projectId}`;
    const note = {
      shortDescription: 'Sample Attestation Authority Note',
      attestation: {
        hint: {
          humanReadableName: 'qa-authority',
        },
      },
    };

    const [createdNote] = await client.createNote({
      parent,
      noteId,
      note,
    });

    console.log(`Created note: ${createdNote.name}`);
    return createdNote;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Note ${noteId} already exists in project ${projectId}.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating note ${noteId}: ${err.message}`);
    } else {
      console.error(`API error creating note: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createNote };
// [END containeranalysis_v1_grafeas_note_create]
