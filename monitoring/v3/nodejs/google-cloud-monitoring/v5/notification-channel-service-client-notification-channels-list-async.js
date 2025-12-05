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

// [START monitoring_v3_notificationchannelservice_notificationchannels_list_async]
const {NotificationChannelServiceClient} =
  require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new NotificationChannelServiceClient();

/**
 * Lists the notification channels that have been created for the project.
 *
 * To list the types of notification channels that are supported, use the
 * `ListNotificationChannelDescriptors` method.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 */
async function listNotificationChannels(projectId) {
  const request = {
    name: `projects/${projectId}`,
  };

  try {
    const [notificationChannels] =
      await client.listNotificationChannels(request);

    if (notificationChannels.length === 0) {
      console.log(`No notification channels found for project ${projectId}.`);
      return;
    }

    console.log('Notification Channels:');
    for (const channel of notificationChannels) {
      console.log(channel.name);
      console.log(`	Description: ${channel.description}`);
      console.log(`	Display Name: ${channel.displayName}`);
      if (channel.labels) {
        console.log('	Labels:');
        for (const key in channel.labels) {
          console.log(`		${key}: ${channel.labels[key]}`);
        }
      }
      console.log(`	Type: ${channel.type}`);
      console.log(`	Verification Status: ${channel.verificationStatus}`);
      console.log('---');
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Error: Project ${projectId} not found or you don't have access.`,
      );
    } else {
      console.error('Error listing notification channels:', err.message);
    }
  }
}
// [END monitoring_v3_notificationchannelservice_notificationchannels_list_async]

async function main(args) {
  if (args.length !== 1) {
    throw new Error(
      `This script requires 1 arguments, but received ${args.length}.`,
    );
  }
  await listNotificationChannels(args[0]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify one argument:
  - Google Cloud Project like 'example-project-168'

  Usage:

   node notification-channel-service-client-notification-channels-list-async.js example-project-168
`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {listNotificationChannels};
