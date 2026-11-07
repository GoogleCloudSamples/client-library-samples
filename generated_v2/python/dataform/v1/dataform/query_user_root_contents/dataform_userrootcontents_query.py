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

# [START dataform_v1_dataform_query_user_root_contents]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def query_user_root_contents(
    project_id: str, location_id: str, location: str
) -> None:
    """Use the query_user_root_contents method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        location: The Google Cloud region where the service is located (for example, 'us-central1')
    """
    location_path = f"projects/{project_id}/locations/{location_id}"

    request = dataform_v1.QueryUserRootContentsRequest(
        location=location_path,
    )

    try:
        response = client.query_user_root_contents(request=request)
        for entry in response:
            print(f"Root content entry: {entry}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to query user root contents: {e}")


# [END dataform_v1_dataform_query_user_root_contents]
