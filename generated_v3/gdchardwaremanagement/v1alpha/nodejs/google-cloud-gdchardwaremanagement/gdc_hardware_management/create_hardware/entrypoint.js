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

'use strict';

const { createHardware } = require('./gdchardwaremanagement-hardware-create.js');

function stripQuotes(val) {
  if (typeof val === 'string' && val.length >= 2) {
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      return val.slice(1, -1);
    }
  }
  return val;
}

// Support environment variables with optional CLI argument overrides
const projectId = stripQuotes(process.env.PROJECT_ID || process.argv[2]);
const locationId = stripQuotes(process.env.LOCATION_ID || process.argv[3]);
const hardwareId = stripQuotes(process.env.HARDWARE_ID || process.argv[4]);
const orderId = stripQuotes(process.env.ORDER_ID || process.argv[5]);
const siteId = stripQuotes(process.env.SITE_ID || process.argv[6]);
const zoneId = stripQuotes(process.env.ZONE_ID || process.argv[7]);
const skuId = stripQuotes(process.env.SKU_ID || process.argv[8]);

createHardware(projectId, locationId, hardwareId, orderId, siteId, zoneId, skuId);
