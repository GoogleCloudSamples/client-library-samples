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

// [START cloudchannel_v1_cloudchannelservice_offers_list]
'use strict';

const {CloudChannelServiceClient} = require('@google-cloud/channel');
const {status} = require('@grpc/grpc-js');

const client = new CloudChannelServiceClient();

/**
 * Use the listOffers method
 *
 * @param {string} accountId - The server-assigned ID of the reseller Account (for example, 'C01234'). Read this value from the Cloud Channel partner console.
 */
async function listOffers(accountId) {
  try {
    const parent = `accounts/${accountId}`;
    const request = {
      parent,
    };

    const [offers] = await client.listOffers(request);
    for (const offer of offers) {
      console.log(`Offer: ${offer.name}`);
      console.log(`Title: ${offer.marketingInfo?.displayName}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Reseller account not found: accounts/${accountId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Caller lacks required permissions to list offers.');
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided in list offers request:', err.message);
    } else {
      console.error(`Failed to list offers (error code ${err.code}):`, err.message);
    }
  }
}

module.exports = { listOffers };
// [END cloudchannel_v1_cloudchannelservice_offers_list]
