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

# [START netapp_v1_netapp_storagepool_create]
import google.api_core.exceptions
from google.cloud import netapp_v1

client = netapp_v1.NetAppClient()


def create_storage_pool(
    storage_pool_id: str, project_id: str, location_id: str, network_id: str
) -> None:
    """Creates a Google Cloud NetApp Volumes storage pool.

    Args:
        storage_pool_id: The ID to use for the storage pool. Must contain only
          letters, numbers, and hyphens, start with a letter, end with a letter
          or number, and be at most 63 characters.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, 'us-central1') where
          the storage pool resides.
        network_id: The ID or name of the VPC network.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    storage_pool = netapp_v1.StoragePool(
        service_level=netapp_v1.ServiceLevel.STANDARD,
        capacity_gib=2048,
        network=f"projects/{project_id}/global/networks/{network_id}",
    )

    request = netapp_v1.CreateStoragePoolRequest(
        parent=parent,
        storage_pool_id=storage_pool_id,
        storage_pool=storage_pool,
    )

    try:
        operation = client.create_storage_pool(request=request)
        response = operation.result()
        print(f"Storage pool created: {response.name}")
        print(f"Service level: {response.service_level.name}")
        print(f"Capacity GiB: {response.capacity_gib}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END netapp_v1_netapp_storagepool_create]
