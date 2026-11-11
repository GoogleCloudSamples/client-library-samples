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

# [START gkerecommender_v1_gkeinferencequickstart_fetch_model_server_versions]
import google.api_core.exceptions
from google.cloud import gkerecommender_v1


def fetch_model_server_versions(model: str, model_server: str) -> None:
    """Fetches supported model server versions for a model and server.

    Args:
        model: The open-source model name in Hugging Face Hub format (for
            example, 'google/gemma-2-2b-it') to list model server versions for.
        model_server: The model server in simplified lowercase format (for
            example, 'vllm') to list versions for.
    """
    client = gkerecommender_v1.GkeInferenceQuickstartClient()

    request = gkerecommender_v1.FetchModelServerVersionsRequest(
        model=model,
        model_server=model_server,
    )

    try:
        response = client.fetch_model_server_versions(request=request)
        print(f"Supported versions for {model_server} running {model}:")
        for version in response.model_server_versions:
            print(f"- {version}")
    except google.api_core.exceptions.NotFound:
        print(
            f"No model server versions found for {model_server} running {model}."
        )
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request error: {e}")
# [END gkerecommender_v1_gkeinferencequickstart_fetch_model_server_versions]
