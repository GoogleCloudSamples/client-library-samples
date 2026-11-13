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

// [START notebooks_v1_notebookservice_schedule_create]
'use strict';

const {NotebookServiceClient} = require('@google-cloud/notebooks');
const {status} = require('@grpc/grpc-js');

const client = new NotebookServiceClient();

/**
 * Creates a schedule for notebook execution.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region (for example, 'us-central1').
 * @param {string} scheduleId - The unique identifier for the schedule (for example, 'example-schedule-id').
 */
async function createSchedule(projectId, locationId, scheduleId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const schedule = {
      displayName: 'Example Schedule',
      description: 'Execution schedule for notebook processing tasks',
      cronSchedule: '0 0 * * *',
      timeZone: 'UTC',
      executionTemplate: {
        scaleTier: 'STANDARD_1',
        masterType: 'n1-standard-4',
        inputNotebookFile: 'gs://example-bucket/input.ipynb',
        outputNotebookFolder: 'gs://example-bucket/output/',
      },
    };

    const request = {
      parent,
      scheduleId,
      schedule,
    };

    const [operation] = await client.createSchedule(request);
    const [response] = await operation.promise();
    console.log(`Created schedule: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Schedule ${scheduleId} already exists.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided for schedule creation: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error creating schedule: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createSchedule };
// [END notebooks_v1_notebookservice_schedule_create]
