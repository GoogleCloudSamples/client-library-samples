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

# [START tpu_v2_tpu_runtimeversion_get]
import google.api_core.exceptions
from google.cloud import tpu_v2

client = tpu_v2.TpuClient()


def get_runtime_version(project_id: str, location_id: str, runtime_version_id: str) -> None:
    """Retrieve details for a specific Cloud TPU runtime version.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (for example, us-central1-a).
        runtime_version_id: The ID of the runtime version.
    """
    name = f"projects/{project_id}/locations/{location_id}/runtimeVersions/{runtime_version_id}"

    request = tpu_v2.GetRuntimeVersionRequest(
        name=name,
    )

    try:
        response = client.get_runtime_version(request=request)
        print(f"Runtime Version Name: {response.name}")
        print(f"Runtime Version: {response.version}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to get runtime version: {e.message}")
# [END tpu_v2_tpu_runtimeversion_get]
