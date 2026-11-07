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

# [START vectorsearch_v1beta_dataobjectservice_dataobject_update]
import google.api_core.exceptions
from google.cloud import vectorsearch_v1beta
from google.protobuf import field_mask_pb2
from google.protobuf import struct_pb2

client = vectorsearch_v1beta.DataObjectServiceClient()


def update_data_object(
    project_id: str, location_id: str, collection_id: str, data_object_id: str
) -> None:
    """Updates a data object in a Vector Search collection.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location for the collection
          (for example, 'us-central1').
        collection_id: The ID of the parent collection containing the data
          object.
        data_object_id: The identifier of the DataObject to update. Must be 1-63
          characters, matching '[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?'.
    """
    resource_name = (
        f"projects/{project_id}/locations/{location_id}/collections/"
        f"{collection_id}/dataObjects/{data_object_id}"
    )

    data_payload = struct_pb2.Struct()
    data_payload.update(
        {
            "title": "Updated Example Title",
            "category": "reference",
        }
    )

    data_object = vectorsearch_v1beta.DataObject(
        name=resource_name,
        data=data_payload,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["data"])

    try:
        response = client.update_data_object(
            data_object=data_object,
            update_mask=update_mask,
        )
        print(f"Updated data object: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to update data object: {exc}")
# [END vectorsearch_v1beta_dataobjectservice_dataobject_update]
