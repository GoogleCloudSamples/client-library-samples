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

# [START recaptchaenterprise_v1_recaptchaenterpriseservice_metrics_get]
import google.api_core.exceptions
from google.cloud import recaptchaenterprise_v1


def get_metrics(project_id: str, key_id: str) -> None:
    """Retrieve metrics for a specified reCAPTCHA Enterprise key.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        key_id: ID of the reCAPTCHA Enterprise key (for example, 'example-key-id').
    """
    client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()

    # Normalize resource identifiers if fully qualified resource names are provided.
    if "projects/" in key_id and "keys/" in key_id:
        parts = key_id.split("/")
        project_id = parts[parts.index("projects") + 1]
        key_id = parts[parts.index("keys") + 1]
    else:
        if "projects/" in project_id:
            project_id = project_id.split("projects/")[-1].split("/")[0]
        if "keys/" in key_id:
            key_id = key_id.split("keys/")[-1].split("/")[0]
        elif "/" in key_id:
            key_id = key_id.strip("/").split("/")[-1]

    name = f"projects/{project_id}/keys/{key_id}/metrics"

    request = recaptchaenterprise_v1.GetMetricsRequest(
        name=name,
    )

    try:
        response = client.get_metrics(request=request)
        print(f"Retrieved metrics: {response.name}")
        print(f"Score metrics count: {len(response.score_metrics)}")
        print(f"Challenge metrics count: {len(response.challenge_metrics)}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END recaptchaenterprise_v1_recaptchaenterpriseservice_metrics_get]
