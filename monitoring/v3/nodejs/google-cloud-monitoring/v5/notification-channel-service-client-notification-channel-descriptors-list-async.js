// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const process = require('process');

// [START monitoring_v3_notificationchannelservice_notificationchanneldescriptors_list_async]
const {NotificationChannelServiceClient} =
  require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new NotificationChannelServiceClient();

/**
 * Lists all notification channel descriptors for a given project.
 *
 * Notification channel descriptors define the types of notification channels
 * that can be created (for example, email, SMS, PagerDuty).
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'your-gcp-project-123')
 */
async function listNotificationChannelDescriptors(projectId) {
  const request = {
    name: `projects/${projectId}`,
  };

  try {
    const [response] = await client.listNotificationChannelDescriptors(request);

    if (response.length === 0) {
      console.log(
        `No notification channel descriptors found for project ${projectId}.`,
      );
      return;
    }

    console.log('Notification Channel Descriptors:');
    for (const descriptor of response) {
      console.log(`	Name: ${descriptor.name}`);
      console.log(`	Description: ${descriptor.description}`);
      console.log(`	Display Name: ${descriptor.displayName}`);
      console.log(`	Type: ${descriptor.type}`);
      console.log('---');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project ${projectId} not found or you do not have permission to access it.`,
      );
      console.error(
        'Make sure the project ID is correct and the service account has the necessary permissions (for example, Monitoring Viewer).',
      );
    } else {
      console.error('Error listing notification channel descriptors:');
    }
  }
}
// [END monitoring_v3_notificationchannelservice_notificationchanneldescriptors_list_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 arguments, but received ${args.length}.`,
    );
  }
  await listNotificationChannelDescriptors(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify one argument:
  - Google Cloud Project like 'example-project-168'

  Usage:

   node notification-channel-service-client-notification-channel-descriptors-list-async.js example-project-168
`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  listNotificationChannelDescriptors,
};
