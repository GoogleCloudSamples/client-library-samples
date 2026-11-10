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

# [START cloudkms_v1_keymanagementservice_importjob_get]
import google.api_core.exceptions
from google.cloud import kms_v1


def get_import_job(
    project_id: str, location_id: str, key_ring_id: str, import_job_id: str
) -> None:
    """Retrieve metadata for an existing Cloud KMS ImportJob.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Cloud KMS location ID (for example, 'global' or 'us-central1').
        key_ring_id: The caller-chosen identifier of the parent KeyRing.
        import_job_id: The caller-chosen identifier of the ImportJob to retrieve.
    """
    client = kms_v1.KeyManagementServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"keyRings/{key_ring_id}/importJobs/{import_job_id}"
    )

    request = kms_v1.GetImportJobRequest(name=name)

    try:
        response = client.get_import_job(request=request)
        print(f"Retrieved import job: {response.name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Request failed: {exc}")
# [END cloudkms_v1_keymanagementservice_importjob_get]
