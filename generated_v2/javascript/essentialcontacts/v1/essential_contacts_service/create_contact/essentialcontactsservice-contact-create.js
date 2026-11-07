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

// [START essentialcontacts_v1_essentialcontactsservice_contact_create]
'use strict';

const {EssentialContactsServiceClient} = require('@google-cloud/essential-contacts');
const {status} = require('@grpc/grpc-js');

const client = new EssentialContactsServiceClient();

/**
 * Creates an essential contact for a Google Cloud project.
 *
 * @param {string} projectId - The ID of the Google Cloud project where the contact will be created.
 */
async function createContact(projectId) {
  try {
    const parent = `projects/${projectId}`;
    const contact = {
      email: `contact-${Date.now()}@example.com`,
      notificationCategorySubscriptions: ['TECHNICAL'],
      languageTag: 'en-US',
    };

    const request = {
      parent,
      contact,
    };

    const [response] = await client.createContact(request);
    console.log(`Created contact: ${response.name}`);
    console.log(`Email: ${response.email}`);
    console.log(`Language tag: ${response.languageTag}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Contact already exists in ${projectId}: ${err.details || err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid contact details provided: ${err.details || err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for resource ${projectId}: ${err.details || err.message}`);
    } else {
      console.error(`Essential Contacts API call failed: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createContact };
// [END essentialcontacts_v1_essentialcontactsservice_contact_create]
