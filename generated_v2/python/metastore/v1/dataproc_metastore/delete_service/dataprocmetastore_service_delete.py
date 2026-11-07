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

# [START metastore_v1_dataprocmetastore_service_delete]
import google.api_core.exceptions
from google.cloud import metastore_v1

client = metastore_v1.DataprocMetastoreClient()


def delete_service(location_id: str, service_id: str, project_id: str) -> None:
    """Deletes an existing Dataproc Metastore service.

    Args:
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        service_id: ID of the Service to delete (for example, 'example-service-id').
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/locations/{location_id}/services/{service_id}"

    try:
        operation = client.delete_service(name=name)
        operation.result()
        print(f"Deleted service: {name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")
# [END metastore_v1_dataprocmetastore_service_delete]
