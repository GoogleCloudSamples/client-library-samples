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

// [START monitoring_v3_notificationchannelservice_notificationchanneldescriptor_get_async]
const {NotificationChannelServiceClient} =
  require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new NotificationChannelServiceClient();

/**
 * Gets a single notification channel descriptor. The descriptor indicates which
 * fields are expected / permitted for a notification channel of the given type.
 *
 * @param {string} projectId Your Google Cloud Project ID (for example, 'example-project-id')
 * @param {string} channelDescriptorId The ID of the channel descriptor to retrieve (for example, 'email', 'sms', 'pagerduty')
 */
async function getNotificationChannelDescriptor(
  projectId,
  channelDescriptorId = 'email',
) {
  const name = client.projectChannelDescriptorPath(
    projectId,
    channelDescriptorId,
  );

  const request = {
    name,
  };

  try {
    const [channelDescriptor] =
      await client.getNotificationChannelDescriptor(request);
    console.log(channelDescriptor.name);
    console.log(`	Description: ${channelDescriptor.description}`);
    console.log(`	Display Name: ${channelDescriptor.displayName}`);
    if (channelDescriptor.labels && channelDescriptor.labels.length > 0) {
      console.log('	Labels:');
      channelDescriptor.labels.forEach(label => {
        console.log(`		- ${label.key}: ${label.description}`);
      });
    }
    console.log(`	Type: ${channelDescriptor.type}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Notification channel descriptor '${channelDescriptorId}' not found in project '${projectId}'.`,
      );
      console.error(
        'Make sure the descriptor ID is correct and exists for your project.',
      );
    } else {
      console.error(
        'Error getting notification channel descriptor:',
        err.message,
      );
    }
  }
}
// [END monitoring_v3_notificationchannelservice_notificationchanneldescriptor_get_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await getNotificationChannelDescriptor(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(
      `To run this sample from the command-line, specify two arguments:
  - Google Cloud Project like 'example-project-168'
  - Channel Descriptor ID like 'email'

  Usage:

   node notification-channel-service-client-notification-channel-descriptor-get-async.js example-project-168 email
`,
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {getNotificationChannelDescriptor};
