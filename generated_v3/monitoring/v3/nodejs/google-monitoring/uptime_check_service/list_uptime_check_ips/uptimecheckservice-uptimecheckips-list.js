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

// [START monitoring_v3_uptimecheckservice_uptimecheckips_list]
'use strict';

const {UptimeCheckServiceClient} = require('@google-cloud/monitoring');
const {status} = require('@grpc/grpc-js');

const client = new UptimeCheckServiceClient();

/**
 * Lists all IP addresses used by Cloud Monitoring uptime check servers.
 */
async function listUptimeCheckIps() {
  try {
    const request = {};
    const [uptimeCheckIps] = await client.listUptimeCheckIps(request);

    for (const ip of uptimeCheckIps) {
      console.log(`Region: ${ip.region}, Location: ${ip.location}, IP Address: ${ip.ipAddress}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAVAILABLE) {
      console.error(`Service unavailable: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { listUptimeCheckIps };
// [END monitoring_v3_uptimecheckservice_uptimecheckips_list]
