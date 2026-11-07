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

// [START essentialcontacts_v1_essentialcontactsservice_compute_contacts]
'use strict';

const {EssentialContactsServiceClient} = require('@google-cloud/essential-contacts');
const {status} = require('@grpc/grpc-js');

const client = new EssentialContactsServiceClient();

/**
 * Use the computeContacts method
 *
 * @param {string} projectId - The Google Cloud project ID. This is a caller-chosen identifier for an existing project.
 */
async function computeContacts(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const notificationCategories = ['TECHNICAL'];

    const request = {
      parent,
      notificationCategories,
    };

    const [contacts] = await client.computeContacts(request);

    for (const contact of contacts) {
      console.log(`Contact email: ${contact.email}`);
      console.log(`Resource name: ${contact.name}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { computeContacts };
// [END essentialcontacts_v1_essentialcontactsservice_compute_contacts]
