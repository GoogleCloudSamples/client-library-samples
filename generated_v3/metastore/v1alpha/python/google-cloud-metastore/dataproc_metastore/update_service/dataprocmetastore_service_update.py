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

# [START metastore_v1alpha_dataprocmetastore_service_update]
import google.api_core.exceptions
from google.cloud import metastore_v1alpha
from google.protobuf import field_mask_pb2

client = metastore_v1alpha.DataprocMetastoreClient()


def update_service(project_id: str, location_id: str, service_id: str) -> None:
    """Use the update_service method.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dataproc Metastore service is located.
        service_id: The ID of the Dataproc Metastore service to update.
    """
    service_name = (
        f"projects/{project_id}/locations/{location_id}/services/{service_id}"
    )

    update_mask = field_mask_pb2.FieldMask(paths=["labels"])
    service = metastore_v1alpha.Service(
        name=service_name,
        labels={"env": "test"},
    )

    try:
        operation = client.update_service(
            service=service,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated service: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Operation failed: {error}")
# [END metastore_v1alpha_dataprocmetastore_service_update]
