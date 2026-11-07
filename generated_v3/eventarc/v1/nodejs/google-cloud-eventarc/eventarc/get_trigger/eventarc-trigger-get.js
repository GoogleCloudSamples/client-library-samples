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

// [START eventarc_v1_eventarc_trigger_get]
'use strict';

const {EventarcClient} = require('@google-cloud/eventarc');
const {status} = require('@grpc/grpc-js');

const client = new EventarcClient();

/**
 * Retrieves an Eventarc trigger.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location or region for the trigger.
 * @param {string} triggerId - The ID of the trigger to retrieve.
 */
async function getTrigger(projectId, locationId, triggerId) {
  const name = client.triggerPath(projectId, locationId, triggerId);

  try {
    const [trigger] = await client.getTrigger({name});

    console.log(`Trigger name: ${trigger.name}`);
    console.log(`Event type: ${trigger.eventFilters?.find(f => f.attribute === 'type')?.value}`);
    return trigger;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Trigger not found: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied for trigger: ${name}`);
    } else {
      console.error(`API error retrieving trigger: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getTrigger };
// [END eventarc_v1_eventarc_trigger_get]
