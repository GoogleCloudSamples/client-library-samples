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

# [START file_v1_cloudfilestoremanager_instance_create]
import google.api_core.exceptions
from google.cloud import filestore_v1


def create_instance(project_id: str, location_id: str, instance_id: str) -> None:
    """Creates a Cloud Filestore instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud zone for the instance (for example, 'us-central1-c').
        instance_id: The caller-chosen ID of the Filestore instance to create (for example, 'example-filestore-instance').
    """
    client = filestore_v1.CloudFilestoreManagerClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    instance = filestore_v1.Instance(
        tier=filestore_v1.Instance.Tier.BASIC_HDD,
        file_shares=[
            filestore_v1.FileShareConfig(
                name="vol1",
                capacity_gb=1024,
            )
        ],
        networks=[
            filestore_v1.NetworkConfig(
                network="default",
                modes=[filestore_v1.NetworkConfig.AddressMode.MODE_IPV4],
            )
        ],
    )

    request = filestore_v1.CreateInstanceRequest(
        parent=parent,
        instance_id=instance_id,
        instance=instance,
    )

    try:
        operation = client.create_instance(request=request)
        response = operation.result()
        print(f"Created Filestore instance: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create Filestore instance: {e}")
# [END file_v1_cloudfilestoremanager_instance_create]
