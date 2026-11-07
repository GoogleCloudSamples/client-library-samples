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

// [START retail_v2alpha_usereventservice_collect_user_event]
'use strict';

const {UserEventServiceClient} = require('@google-cloud/retail');
const {status} = require('@grpc/grpc-js');

const client = new UserEventServiceClient();

/**
 * Collects a user event from an application or web page.
 */
async function collectUserEvent() {
  try {
    const projectId = 'example-project-id';
    const location = 'global';
    const catalog = 'default_catalog';
    const parent = `projects/${projectId}/locations/${location}/catalogs/${catalog}`;
    const userEvent = JSON.stringify({
      eventType: 'detail-page-view',
      visitorId: 'example-visitor-id',
    });
    const user_event = userEvent;

    const request = {
      parent,
      userEvent: user_event,
    };

    const [response] = await client.collectUserEvent(request);
    console.log('User event collected successfully.');
    console.log(`Response content type: ${response.contentType}`);
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid request argument:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Catalog not found:', err.message);
    } else {
      console.error('Failed to collect user event:', err.message);
    }
  }
}

module.exports = { collectUserEvent };
// [END retail_v2alpha_usereventservice_collect_user_event]
