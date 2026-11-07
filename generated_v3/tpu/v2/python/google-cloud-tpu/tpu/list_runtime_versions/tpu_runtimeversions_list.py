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

# [START tpu_v2_tpu_runtimeversions_list]
import google.api_core.exceptions
from google.cloud import tpu_v2

client = tpu_v2.TpuClient()


def list_runtime_versions(project_id: str, location_id: str) -> None:
    """Lists Cloud TPU runtime versions available in a specified location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (region or zone) where runtime versions are queried, such as us-central1-a.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = tpu_v2.ListRuntimeVersionsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_runtime_versions(request=request)
        for runtime_version in page_result:
            print(f"Version: {runtime_version.version}")
            print(f"Name: {runtime_version.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END tpu_v2_tpu_runtimeversions_list]
