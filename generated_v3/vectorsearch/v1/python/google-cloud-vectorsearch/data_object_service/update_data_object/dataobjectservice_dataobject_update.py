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

# [START vectorsearch_v1_dataobjectservice_dataobject_update]
import google.api_core.exceptions
from google.cloud import vectorsearch_v1
from google.protobuf import field_mask_pb2, struct_pb2

client = vectorsearch_v1.DataObjectServiceClient()


def update_data_object(
    project_id: str,
    location_id: str,
    collection_id: str,
    data_object_id: str,
) -> None:
    """Updates a DataObject within a Vector Search Collection.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Collection is located.
        collection_id: The ID of the Vector Search Collection containing the DataObject.
        data_object_id: The ID of the DataObject to update.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/collections/{collection_id}/dataObjects/{data_object_id}"
    )

    data_payload = struct_pb2.Struct()
    data_payload.update({"title": "Updated Document Title", "status": "active"})

    data_object = vectorsearch_v1.DataObject(
        name=name,
        data=data_payload,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["data"])

    try:
        response = client.update_data_object(
            data_object=data_object,
            update_mask=update_mask,
        )
        print(f"Updated DataObject: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update DataObject: {e}")
# [END vectorsearch_v1_dataobjectservice_dataobject_update]
