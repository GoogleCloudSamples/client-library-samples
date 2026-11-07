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

// [START essentialcontacts_v1_essentialcontactsservice_contact_delete]
'use strict';

const {EssentialContactsServiceClient} = require('@google-cloud/essential-contacts');
const {status} = require('@grpc/grpc-js');

const client = new EssentialContactsServiceClient();

/**
 * Deletes an essential contact from a project.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} contactId - The server-generated ID of the contact to delete.
 */
async function deleteContact(projectId, contactId) {
  const name = `projects/${projectId}/contacts/${contactId}`;

  try {
    const request = {
      name,
    };

    await client.deleteContact(request);
    console.log(`Deleted contact: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Contact not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when deleting contact: ${name}`);
    } else {
      console.error(`Failed to delete contact: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteContact };
// [END essentialcontacts_v1_essentialcontactsservice_contact_delete]
