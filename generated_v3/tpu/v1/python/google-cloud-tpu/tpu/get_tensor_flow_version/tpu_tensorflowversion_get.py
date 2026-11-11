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

# [START tpu_v1_tpu_tensorflowversion_get]
import os

from google.api_core import exceptions
from google.cloud import tpu_v1


def get_tensor_flow_version() -> None:
    """Retrieve details of a TensorFlow version supported by Cloud TPU."""
    client = tpu_v1.TpuClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")
    location = os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1-a")
    version = "2.12.0"

    name = f"projects/{project_id}/locations/{location}/tensorflowVersions/{version}"

    try:
        response = client.get_tensor_flow_version(name=name)
        print(f"TensorFlow version: {response.version}")
        print(f"Resource name: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END tpu_v1_tpu_tensorflowversion_get]
