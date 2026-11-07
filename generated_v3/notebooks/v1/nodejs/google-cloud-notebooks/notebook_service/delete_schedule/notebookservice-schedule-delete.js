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

// [START notebooks_v1_notebookservice_schedule_delete]
'use strict';

const {NotebookServiceClient} = require('@google-cloud/notebooks');
const {status} = require('@grpc/grpc-js');

const client = new NotebookServiceClient();

/**
 * Deletes a notebook schedule.
 *
 * @param {string} projectId - Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} scheduleId - Identifier of the schedule (for example, 'example-schedule-id')
 */
async function deleteSchedule(projectId, locationId, scheduleId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/schedules/${scheduleId}`;

    // Initialize the long-running operation to delete the schedule
    const [operation] = await client.deleteSchedule({name});

    // Wait for the deletion operation to complete
    await operation.promise();

    console.log(`Deleted schedule: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Schedule not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Operation failed precondition: ${err.message}`);
    } else {
      console.error(`Failed to delete schedule: ${err.message}`);
    }
  }
}

module.exports = { deleteSchedule };
// [END notebooks_v1_notebookservice_schedule_delete]
