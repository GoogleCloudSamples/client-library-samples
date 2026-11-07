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

const { getCluster } = require('./bigtableinstanceadmin-cluster-get.js');

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
const instanceId = stripQuotes(process.env.INSTANCE_ID || process.argv[3]);
const clusterId = stripQuotes(process.env.CLUSTER_ID || process.argv[4]);

getCluster(projectId, instanceId, clusterId);
