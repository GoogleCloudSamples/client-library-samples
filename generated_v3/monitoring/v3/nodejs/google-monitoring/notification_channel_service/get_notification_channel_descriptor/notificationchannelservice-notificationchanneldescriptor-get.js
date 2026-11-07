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

// [START monitoring_v3_notificationchannelservice_notificationchanneldescriptor_get]
'use strict';

const {NotificationChannelServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new NotificationChannelServiceClient();

/**
 * Retrieves a notification channel descriptor.
 *
 * @param {string} notificationChannelDescriptorId - The notification channel descriptor type (for example, 'email', 'sms', 'slack').
 * @param {string} projectId - The Google Cloud project ID.
 */
async function getNotificationChannelDescriptor(notificationChannelDescriptorId, projectId) {
  try {
    const name = `projects/${projectId}/notificationChannelDescriptors/${notificationChannelDescriptorId}`;

    const request = {
      name,
    };

    const [descriptor] = await client.getNotificationChannelDescriptor(request);

    console.log(`Descriptor Name: ${descriptor.name}`);
    console.log(`Type: ${descriptor.type}`);
    console.log(`Display Name: ${descriptor.displayName}`);
    console.log(`Description: ${descriptor.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Notification channel descriptor not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`RPC error: ${err.message}`);
    }
  }
}

module.exports = { getNotificationChannelDescriptor };
// [END monitoring_v3_notificationchannelservice_notificationchanneldescriptor_get]
