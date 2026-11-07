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

# [START certificatemanager_v1_certificatemanager_trustconfig_delete]
import google.api_core.exceptions
from google.cloud import certificate_manager_v1


def delete_trust_config(
    project_id: str, location_id: str, trust_config_id: str
) -> None:
    """Deletes a trust configuration resource.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
        location_id: The Google Cloud region where the service is located (for
            example, 'us-central1').
        trust_config_id: ID of the TrustConfig (for example,
            'example-trustconfig-id').
    """
    client = certificate_manager_v1.CertificateManagerClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/trustConfigs/{trust_config_id}"
    )

    try:
        operation = client.delete_trust_config(name=name)
        operation.result()
        print(f"Deleted trust config: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete trust config: {e}")
# [END certificatemanager_v1_certificatemanager_trustconfig_delete]
