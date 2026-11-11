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

# [START discoveryengine_v1beta_userlicenseservice_licenseconfigsusagestats_list]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta


def list_license_configs_usage_stats(
    project_id: str, location_id: str, user_store_id: str
) -> None:
    """Lists license configuration usage statistics for a user store.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'global').
        user_store_id: The ID of the UserStore (for example, 'default_user_store').
    """
    client_options = (
        {"api_endpoint": f"{location_id}-discoveryengine.googleapis.com"}
        if location_id != "global"
        else None
    )
    client = discoveryengine_v1beta.UserLicenseServiceClient(
        client_options=client_options
    )

    parent = (
        f"projects/{project_id}/locations/{location_id}/userStores/{user_store_id}"
    )

    request = discoveryengine_v1beta.ListLicenseConfigsUsageStatsRequest(
        parent=parent
    )

    try:
        response = client.list_license_configs_usage_stats(request=request)
        for usage_stat in response.license_config_usage_stats:
            print(f"License config: {usage_stat.license_config}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END discoveryengine_v1beta_userlicenseservice_licenseconfigsusagestats_list]
