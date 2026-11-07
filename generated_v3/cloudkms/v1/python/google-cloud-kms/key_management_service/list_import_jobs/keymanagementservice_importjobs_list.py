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

# [START cloudkms_v1_keymanagementservice_importjobs_list]
import google.api_core.exceptions
from google.cloud import kms_v1


def list_import_jobs(project_id: str, location_id: str, key_ring_id: str) -> None:
    """Lists import jobs in a key ring.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where the KeyRing is located (for example, 'global' or 'us-central1').
        key_ring_id: The identifier of the KeyRing (for example, 'example-key-ring'). Must match regular expression '[a-zA-Z0-9_-]{1,63}'.
    """
    client = kms_v1.KeyManagementServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}/keyRings/{key_ring_id}"

    try:
        response = client.list_import_jobs(
            request=kms_v1.ListImportJobsRequest(parent=parent)
        )
        for import_job in response:
            print(f"Name: {import_job.name}")
            print(f"Import method: {import_job.import_method.name}")
            print(f"Protection level: {import_job.protection_level.name}")
            print(f"State: {import_job.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list import jobs: {error}")
# [END cloudkms_v1_keymanagementservice_importjobs_list]
