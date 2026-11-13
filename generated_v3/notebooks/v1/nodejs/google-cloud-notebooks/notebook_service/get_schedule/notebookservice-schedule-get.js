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

// [START notebooks_v1_notebookservice_schedule_get]
'use strict';

const {NotebookServiceClient} = require('@google-cloud/notebooks');
const {status} = require('@grpc/grpc-js');

const client = new NotebookServiceClient();

/**
 * Retrieves an existing schedule from Google Cloud Notebooks.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud region where the schedule is located (for example, 'us-central1').
 * @param {string} scheduleId - The caller-chosen ID of the schedule to retrieve (for example, 'example-schedule-id').
 */
async function getSchedule(projectId, locationId, scheduleId) {
  const name = `projects/${projectId}/locations/${locationId}/schedules/${scheduleId}`;

  try {
    const request = {
      name,
    };

    const [schedule] = await client.getSchedule(request);

    console.log(`Retrieved schedule: ${schedule.name}`);
    console.log(`State: ${schedule.state}`);
    console.log(`Cron schedule: ${schedule.cronSchedule}`);
    return schedule;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Schedule not found at path: ${name}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied when accessing schedule: ${name}`);
    } else {
      console.error(`API error retrieving schedule: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getSchedule };
// [END notebooks_v1_notebookservice_schedule_get]
