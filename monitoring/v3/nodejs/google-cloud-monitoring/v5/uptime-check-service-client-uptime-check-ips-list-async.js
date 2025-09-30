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

// [START monitoring_v3_uptimecheckservice_uptimecheckips_list_async]
const {UptimeCheckServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new UptimeCheckServiceClient();

/**
 * Lists the IP addresses that Uptime Check checkers run from.
 *
 * This method provides a global list of IP addresses used by Google Cloud's
 * Uptime Check service to perform checks. This information can be useful for
 * configuring firewalls or network access policies.
 */
async function listUptimeCheckIps() {
  try {
    const request = {};

    console.log('Listing Uptime Check IP addresses...');
    const [response] = await client.listUptimeCheckIps(request);

    if (response.length === 0) {
      console.log('No Uptime Check IPs found.');
      return;
    }

    console.log('Found the following Uptime Check IP addresses:');
    for (const ip of response) {
      console.log(`	IP Address: ${ip.ipAddress}, Region: ${ip.location}`);
    }
  } catch (err) {
    if (err.code === status.UNAUTHENTICATED) {
      console.error(
        'Authentication error: Make sure you have valid credentials and permissions.',
      );
      console.error(`Details: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(
        'Permission denied: The service account or user does not have sufficient permissions.',
      );
      console.error(`Details: ${err.message}`);
    } else {
      console.error('Error listing Uptime Check IPs:', err.message);
    }
  }
}
// [END monitoring_v3_uptimecheckservice_uptimecheckips_list_async]

async function main(args) {
  if (args.length !== 0) {
    throw new Error(
      `This script takes no arguments, but received ${args.length}.`,
    );
  }
  await listUptimeCheckIps();
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error('Usage:');
    console.error(
      '  node uptime-check-service-client-uptime-check-ips-list-async.js',
    );
    process.exitCode = 1;
  });
  main(process.argv.slice(2));
}

module.exports = {listUptimeCheckIps};
