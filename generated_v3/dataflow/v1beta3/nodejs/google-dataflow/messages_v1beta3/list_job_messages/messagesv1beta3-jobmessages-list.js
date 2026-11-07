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

// [START dataflow_v1beta3_messagesv1beta3_jobmessages_list]
'use strict';

const {MessagesV1Beta3Client} = require('@google-cloud/dataflow');
const {status} = require('@grpc/grpc-js');

const client = new MessagesV1Beta3Client();

/**
 * Lists messages associated with a Dataflow job.
 *
 * @param {string} projectId - The ID of the Google Cloud project that contains the job.
 * @param {string} locationId - The regional endpoint location where the Dataflow job is running (for example, 'us-central1').
 * @param {string} jobId - The server-generated ID of the Dataflow job to get messages about.
 */
async function listJobMessages(projectId, locationId, jobId) {
  try {
    const request = {
      projectId,
      location: locationId,
      jobId,
    };

    const [messages] = await client.listJobMessages(request);

    console.log(`Retrieved ${messages.length} messages for job ${jobId}:`);
    for (const message of messages) {
      console.log(`[${message.messageImportance}] ${message.messageText}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job ${jobId} not found in project ${projectId}.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing job ${jobId}.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid arguments provided: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listJobMessages };
// [END dataflow_v1beta3_messagesv1beta3_jobmessages_list]
