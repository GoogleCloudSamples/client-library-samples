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

# [START netapp_v1_netapp_execute_ontap_get]
from google.api_core import exceptions
from google.cloud import netapp_v1


def execute_ontap_get(
    location_id: str,
    storage_pool_id: str,
    ontap_resource_path: str,
    project_id: str,
) -> None:
    """Executes a GET query against an ONTAP REST API endpoint.

    Args:
        location_id: The Google Cloud location (region) where the StoragePool is
          located (for example, 'us-central1').
        storage_pool_id: The ID of an existing ONTAP-mode StoragePool (for example,
          'example-storage-pool').
        ontap_resource_path: The relative path of the ONTAP REST API resource
          (for example, 'api/storage/volumes').
        project_id: The Google Cloud project ID.
    """
    client = netapp_v1.NetAppClient()

    ontap_path = (
        f"projects/{project_id}/locations/{location_id}/storagePools/"
        f"{storage_pool_id}/ontap/{ontap_resource_path.lstrip('/')}"
    )

    request = netapp_v1.ExecuteOntapGetRequest(
        ontap_path=ontap_path,
    )

    try:
        response = client.execute_ontap_get(request=request)
        print(f"ONTAP GET response: {response}")
    except exceptions.BadRequest as error:
        if "ONTAP Mode is not enabled" in str(error):
            print(
                f"ONTAP mode is not enabled for storage pool '{storage_pool_id}'."
            )
        else:
            print(f"ONTAP GET request encountered BadRequest: {error}")
    except exceptions.GoogleAPICallError as error:
        print(f"ONTAP GET request encountered an error: {error}")


# [END netapp_v1_netapp_execute_ontap_get]
