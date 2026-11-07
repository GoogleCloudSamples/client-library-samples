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

# [START gkerecommender_v1_gkeinferencequickstart_fetch_models]
import google.api_core.exceptions
from google.cloud import gkerecommender_v1


def fetch_models() -> None:
    """Fetch available inference models from the GKE Inference Quickstart service."""
    client = gkerecommender_v1.GkeInferenceQuickstartClient()

    request = gkerecommender_v1.FetchModelsRequest()

    try:
        response = client.fetch_models(request=request)
        print("Models fetched:")
        for model in response.models:
            print(model)
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END gkerecommender_v1_gkeinferencequickstart_fetch_models]
