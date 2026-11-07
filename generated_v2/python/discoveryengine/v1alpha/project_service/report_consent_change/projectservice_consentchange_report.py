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

# [START discoveryengine_v1alpha_projectservice_report_consent_change]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1alpha

client = discoveryengine_v1alpha.ProjectServiceClient()


def report_consent_change(project_id: str) -> None:
    """Reports a consent change for a Discovery Engine project.

    Args:
        project_id: The Google Cloud project ID.
    """
    service_term_version = "2022-11-23"
    project = f"projects/{project_id}"
    service_term_id = "GA_DATA_USE_TERMS"
    consent_change_action = (
        discoveryengine_v1alpha.ReportConsentChangeRequest.ConsentChangeAction.ACCEPT
    )

    request = discoveryengine_v1alpha.ReportConsentChangeRequest(
        consent_change_action=consent_change_action,
        project=project,
        service_term_id=service_term_id,
        service_term_version=service_term_version,
    )

    try:
        response = client.report_consent_change(request=request)
        print(f"Reported consent change for project: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Operation failed with error: {exc}")
# [END discoveryengine_v1alpha_projectservice_report_consent_change]
