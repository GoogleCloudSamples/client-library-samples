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

// [START monitoring_v3_notificationchannelservice_notificationchannel_get_async]
const {NotificationChannelServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new NotificationChannelServiceClient();

/**
 * Gets a single notification channel.
 *
 * This sample demonstrates how to retrieve a specific notification channel
 * by its resource name. The channel includes configuration details, but
 * sensitive information like passwords may be truncated or omitted.
 *
 * @param {string} [projectId] Your Google Cloud Project ID.
 * @param {string} [notificationChannelId] The ID of the notification channel to retrieve.
 */
async function getNotificationChannel(
  projectId,
  notificationChannelId = 'your-notification-channel-123',
) {
  const name = `projects/${projectId}/notificationChannels/${notificationChannelId}`;

  const request = {
    name,
  };

  try {
    const [notificationChannel] = await client.getNotificationChannel(request);
    console.log(notificationChannel.name);
    console.log(`	Description: ${notificationChannel.description}`);
    console.log(`	Display Name: ${notificationChannel.displayName}`);
    console.log(`	Enabled: ${notificationChannel.enabled?.value}`);
    console.log('	Labels:', notificationChannel.labels);
    console.log(`	Type: ${notificationChannel.type}`);
    console.log('	User Labels:', notificationChannel.userLabels);
    console.log(
      `	Verification Status: ${notificationChannel.verificationStatus}`,
    );
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Notification Channel '${notificationChannelId}' not found for project '${projectId}'. ` +
          'Make sure the ID is correct and the channel exists.',
      );
    } else {
      console.error('Error getting notification channel:', err.message);
    }
  }
}
// [END monitoring_v3_notificationchannelservice_notificationchannel_get_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await getNotificationChannel(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, provide the following arguments:
    1. Google Cloud Project ID (for example, 'example-project-id')
    2. Notification Channel ID (for example, 'your-notification-channel-123')

    Usage:
    node notification-channel-service-client-notification-channel-get-async.js example-project-id your-notification-channel-123`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {
  getNotificationChannel,
};
