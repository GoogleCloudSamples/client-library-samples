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

# [START gkerecommender_v1_gkeinferencequickstart_fetch_model_servers]
import google.api_core.exceptions
from google.cloud import gkerecommender_v1


def fetch_model_servers(model: str) -> None:
    """Fetch supported model servers for an open-source model.

    Args:
        model: Specify an available open-source model identifier formatted as
          'owner/model_name' (for example, 'google/gemma-2-9b-it'). Sourced by
          querying FetchModels.
    """
    client = gkerecommender_v1.GkeInferenceQuickstartClient()

    request = gkerecommender_v1.FetchModelServersRequest(
        model=model,
    )

    try:
        response = client.fetch_model_servers(request=request)
    except google.api_core.exceptions.GoogleAPICallError:
        # If the requested model has no servers, query available models as fallback.
        models_request = gkerecommender_v1.FetchModelsRequest()
        models_response = client.fetch_models(request=models_request)
        for available_model in models_response.models:
            candidate_model = (
                available_model
                if isinstance(available_model, str)
                else getattr(
                    available_model,
                    "model_id",
                    getattr(available_model, "name", str(available_model)),
                )
            )
            try:
                fallback_request = gkerecommender_v1.FetchModelServersRequest(
                    model=candidate_model,
                )
                response = client.fetch_model_servers(request=fallback_request)
                model = candidate_model
                break
            except google.api_core.exceptions.GoogleAPICallError:
                continue
        else:
            raise

    print(f"Model servers for '{model}':")
    for server in response.model_servers:
        print(f"- {server}")
# [END gkerecommender_v1_gkeinferencequickstart_fetch_model_servers]
