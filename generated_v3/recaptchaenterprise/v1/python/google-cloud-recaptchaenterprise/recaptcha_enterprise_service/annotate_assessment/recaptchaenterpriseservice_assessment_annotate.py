# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START recaptchaenterprise_v1_recaptchaenterpriseservice_annotate_assessment]
import google.api_core.exceptions
from google.cloud import recaptchaenterprise_v1


def annotate_assessment(project_id: str, assessment_id: str) -> None:
    """Annotates an assessment with fraud or legitimacy feedback.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        assessment_id: ID of the assessment (for example, 'example-assessment-id').
    """
    client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()

    # Construct the resource name for the assessment
    name = f"projects/{project_id}/assessments/{assessment_id}"

    # Annotate the assessment with feedback regarding fraud or legitimacy
    request = recaptchaenterprise_v1.AnnotateAssessmentRequest(
        name=name,
        annotation=recaptchaenterprise_v1.AnnotateAssessmentRequest.Annotation.FRAUDULENT,
        reasons=[
            recaptchaenterprise_v1.AnnotateAssessmentRequest.Reason.PAYMENT_HEURISTICS
        ],
    )

    try:
        client.annotate_assessment(request=request)
        print(f"Annotated assessment successfully: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END recaptchaenterprise_v1_recaptchaenterpriseservice_annotate_assessment]
