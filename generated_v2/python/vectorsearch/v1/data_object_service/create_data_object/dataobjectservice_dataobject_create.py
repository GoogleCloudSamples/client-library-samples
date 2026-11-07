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

# [START vectorsearch_v1_dataobjectservice_dataobject_create]
import google.api_core.exceptions
from google.cloud import vectorsearch_v1


def create_data_object(
    project_id: str, location_id: str, collection_id: str, data_object_id: str
) -> None:
    """Creates a data object in a collection.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        collection_id: ID of the collection (for example, 'example-collection-id').
        data_object_id: ID of the data object (for example, 'example-data-object-id').
    """
    client = vectorsearch_v1.DataObjectServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/collections/{collection_id}"
    data_object = vectorsearch_v1.DataObject()

    try:
        response = client.create_data_object(
            parent=parent,
            data_object=data_object,
            data_object_id=data_object_id,
        )
        print(f"Created data object: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create data object: {error}")
# [END vectorsearch_v1_dataobjectservice_dataobject_create]
