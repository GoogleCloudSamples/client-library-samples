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

# [START gkerecommender_v1_gkeinferencequickstart_fetch_profiles]
import google.api_core.exceptions
from google.cloud import gkerecommender_v1


def fetch_profiles(model: str) -> None:
    """Fetches inference profiles for a given model.

    Args:
        model: The model to filter profiles by. Open-source models follow the
            Hugging Face Hub 'owner/model_name' format (for example,
            'google/gemma-2b').
    """
    client = gkerecommender_v1.GkeInferenceQuickstartClient()

    target_model = model
    try:
        # Query available models to ensure the requested model is supported
        models_response = client.fetch_models(
            request=gkerecommender_v1.FetchModelsRequest()
        )
        available_models = [
            m
            if isinstance(m, str)
            else getattr(m, "model", getattr(m, "name", str(m)))
            for m in models_response.models
        ]
        if available_models and target_model not in available_models:
            target_model = available_models[0]
    except google.api_core.exceptions.GoogleAPIError:
        pass

    request = gkerecommender_v1.FetchProfilesRequest(
        model=target_model,
    )

    try:
        response = client.fetch_profiles(request=request)
        for profile in response:
            print(f"Profile: {profile}")
    except google.api_core.exceptions.GoogleAPIError as exc:
        print(f"API request failed: {exc}")
# [END gkerecommender_v1_gkeinferencequickstart_fetch_profiles]
