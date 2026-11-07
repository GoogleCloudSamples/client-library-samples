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

# [START gkehub_v1_gkehub_feature_update]
import google.api_core.exceptions
from google.cloud import gkehub_v1
from google.protobuf import field_mask_pb2

client = gkehub_v1.GkeHubClient()


def update_feature(project_id: str, location_id: str, feature_id: str) -> None:
    """Use the update_feature method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location of the Feature resource. For Features, this must be 'global'.
        feature_id: The ID of the feature to update (e.g., 'multiclusteringress', 'configmanagement').
    """
    feature_name = (
        f"projects/{project_id}/locations/{location_id}/features/{feature_id}"
    )

    update_mask = field_mask_pb2.FieldMask(paths=["labels"])
    resource = gkehub_v1.Feature(labels={"env": "prod"})

    try:
        operation = client.update_feature(
            name=feature_name,
            update_mask=update_mask,
            resource=resource,
        )
        response = operation.result()
        print(f"Updated feature: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Operation failed: {e.message}")


# [END gkehub_v1_gkehub_feature_update]
