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

# [START cloudkms_v1_keymanagementservice_importjob_create]
import google.api_core.exceptions
from google.cloud import kms_v1


def create_import_job(
    import_job_id: str,
    project_id: str,
    location_id: str,
    key_ring_id: str,
) -> None:
    """Create an import job in a Cloud KMS key ring.

    Args:
        import_job_id: A unique identifier for the ImportJob within the KeyRing.
        project_id: The Google Cloud project ID.
        location_id: The Cloud KMS location (for example, 'global' or
          'us-central1').
        key_ring_id: The ID of the parent KeyRing.
    """
    client = kms_v1.KeyManagementServiceClient()

    parent = client.key_ring_path(project_id, location_id, key_ring_id)
    import_job = kms_v1.ImportJob(
        import_method=kms_v1.ImportJob.ImportMethod.RSA_OAEP_3072_SHA1_AES_256,
        protection_level=kms_v1.ProtectionLevel.SOFTWARE,
    )

    try:
        response = client.create_import_job(
            parent=parent,
            import_job_id=import_job_id,
            import_job=import_job,
        )
        print(f"Created import job: {response.name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")
# [END cloudkms_v1_keymanagementservice_importjob_create]
