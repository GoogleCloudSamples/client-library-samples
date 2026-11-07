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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_annotate_assessment]
'use strict';

const {RecaptchaEnterpriseServiceClient, protos} = require('@google-cloud/recaptcha-enterprise');
const {status} = require('@grpc/grpc-js');

const client = new RecaptchaEnterpriseServiceClient();

/**
 * Annotates an assessment to provide feedback on the verdict.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} assessmentId - The server-generated ID of the Assessment (for example, 'assessment123'), obtained from the response of a previous CreateAssessment call.
 */
async function annotateAssessment(projectId, assessmentId) {
  try {
    const name = `projects/${projectId}/assessments/${assessmentId}`;
    const annotation =
      protos.google.cloud.recaptchaenterprise.v1.AnnotateAssessmentRequest.Annotation.FRAUDULENT;

    const request = {
      name,
      annotation,
    };

    await client.annotateAssessment(request);
    console.log(`Assessment annotated successfully: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Assessment not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to annotate assessment: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { annotateAssessment };
// [END recaptchaenterprise_v1_recaptchaenterpriseservice_annotate_assessment]
