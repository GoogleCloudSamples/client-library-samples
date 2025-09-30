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

// [START monitoring_v3_servicemonitoringservice_service_get_async]
const {ServiceMonitoringServiceClient} = require('@google-cloud/monitoring').v3;
const {status} = require('@grpc/grpc-js');

const client = new ServiceMonitoringServiceClient();

/**
 * Get a specific Service by its ID.
 *
 * This sample demonstrates how to retrieve details of a specific service
 * within a Google Cloud project using the Monitoring API.
 *
 * @param {string} [projectId='example-project-id'] The Google Cloud project ID. for example,: 'example-project-id'
 * @param {string} [serviceId='your-service-id'] The ID of the service to retrieve. Example: 'your-service-id'
 */
async function getService(projectId, serviceId = 'your-service-id') {
  const name = client.projectServicePath(projectId, serviceId);

  const request = {
    name,
  };

  try {
    const [service] = await client.getService(request);

    console.log(service.name);
    console.log(`	Display Name: ${service.displayName}`);

    if (service.custom) {
      console.log('	Service type: Custom');
    } else if (service.appEngine) {
      console.log(
        `	Service type: App Engine, Module ID: ${service.appEngine.moduleId}`,
      );
    } else if (service.cloudEndpoints) {
      console.log(
        `	Service type: Cloud Endpoints, Service Name: ${service.cloudEndpoints.service}`,
      );
    } else if (service.clusterIstio) {
      console.log(
        `	Service type: Cluster Istio, Cluster Name: ${service.clusterIstio.clusterName}`,
      );
    } else if (service.meshIstio) {
      console.log(
        `	Service type: Mesh Istio, Mesh UID: ${service.meshIstio.meshUid}`,
      );
    } else if (service.istioCanonicalService) {
      console.log(
        `	Service type: Istio Canonical Service, Mesh UID: ${service.istioCanonicalService.meshUid}`,
      );
    } else if (service.cloudRun) {
      console.log(
        `	Service type: Cloud Run, Service Name: ${service.cloudRun.serviceName}`,
      );
    } else if (service.gkeNamespace) {
      console.log(
        `	Service type: GKE Namespace, Namespace Name: ${service.gkeNamespace.namespaceName}`,
      );
    } else if (service.gkeWorkload) {
      console.log(
        `	Service type: GKE Workload, Workload Name: ${service.gkeWorkload.topLevelControllerName}`,
      );
    } else if (service.gkeService) {
      console.log(
        `	Service type: GKE Service, Service Name: ${service.gkeService.serviceName}`,
      );
    } else if (service.basicService) {
      console.log(
        `	Service type: Basic Service, Type: ${service.basicService.serviceType}`,
      );
    } else {
      console.log('	Service type: Unknown or not specified.');
    }

    if (service.telemetry && service.telemetry.resourceName) {
      console.log(`	Telemetry Resource Name: ${service.telemetry.resourceName}`);
    }
    if (service.userLabels && Object.keys(service.userLabels).length > 0) {
      console.log('	User Labels:', service.userLabels);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Service "${serviceId}" not found under project "${projectId}". ` +
          'Make sure the service ID is correct and exists in the specified project.',
      );
    } else {
      console.error(`Error getting service "${serviceId}":`, err);
    }
  }
}
// [END monitoring_v3_servicemonitoringservice_service_get_async]

async function main(args) {
  if (args.length !== 2) {
    throw new Error(
      `This script requires 2 arguments, but received ${args.length}.`,
    );
  }
  await getService(args[0], args[1]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide arguments:
Usage: node getService.js <projectId> <serviceId>

Example:
  node getService.js example-project-id your-service-id
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {getService};
