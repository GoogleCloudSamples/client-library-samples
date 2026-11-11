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

# [START gkehub_v1_gkehub_feature_get]
import google.api_core.exceptions
from google.cloud import gkehub_v1

client = gkehub_v1.GkeHubClient()


def get_feature(project_id: str, location_id: str, feature_id: str) -> None:
    """Retrieves details of an existing Feature resource in a Fleet.

    Args:
        project_id: The Google Cloud project ID hosting the Feature.
        location_id: The location of the Feature resource (for example, 'global').
        feature_id: The ID of the Feature resource to retrieve (for example, 'servicemesh').
    """
    feature_name = f"projects/{project_id}/locations/{location_id}/features/{feature_id}"

    try:
        response = client.get_feature(name=feature_name)
        print(f"Feature name: {response.name}")
        print(f"Create time: {response.create_time}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API request failed: {exc}")
# [END gkehub_v1_gkehub_feature_get]
