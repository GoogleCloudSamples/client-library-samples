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

# [START dataform_v1_dataform_releaseconfig_get]
import google.api_core.exceptions
from google.cloud import dataform_v1

client = dataform_v1.DataformClient()


def get_release_config(
    project_id: str, location_id: str, repository_id: str, release_config_id: str
) -> None:
    """Use the get_release_config method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the Dataform repository is
          located (for example, us-central1).
        repository_id: The caller-chosen ID of the existing Dataform repository.
        release_config_id: The caller-chosen ID of the Dataform release
          configuration to fetch.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/repositories/{repository_id}/"
        f"releaseConfigs/{release_config_id}"
    )

    try:
        response = client.get_release_config(name=name)
        print(f"Retrieved release config: {response.name}")
        print(f"Git commitish: {response.git_commitish}")
        print(f"Cron schedule: {response.cron_schedule}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")


# [END dataform_v1_dataform_releaseconfig_get]
