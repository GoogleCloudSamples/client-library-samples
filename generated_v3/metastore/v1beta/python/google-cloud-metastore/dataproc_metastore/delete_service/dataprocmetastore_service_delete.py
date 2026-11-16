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

# [START metastore_v1beta_dataprocmetastore_service_delete]
import google.api_core.exceptions
from google.cloud import metastore_v1beta

client = metastore_v1beta.DataprocMetastoreClient()


def delete_service(location_id: str, service_id: str, project_id: str) -> None:
    """Use the delete_service method

    Args:
        location_id: The Google Cloud region where the metastore service is located (for example, 'us-central1').
        service_id: The caller-chosen ID of the metastore service to delete.
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/locations/{location_id}/services/{service_id}"

    try:
        operation = client.delete_service(name=name)
        print(f"Waiting for deletion operation {operation.operation.name} to complete...")
        operation.result()
        print(f"Deleted Dataproc Metastore service: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete service: {error}")
# [END metastore_v1beta_dataprocmetastore_service_delete]
