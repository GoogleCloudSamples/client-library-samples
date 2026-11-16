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

# [START retail_v2alpha_modelservice_tune_model]
from google.api_core import exceptions
from google.cloud import retail_v2alpha


def tune_model(
    location_id: str, catalog_id: str, model_id: str, project_number: str
) -> None:
    """Tune an existing model in the Google Cloud Retail service.

    Args:
        location_id: The Google Cloud location ID (for example, 'global').
        catalog_id: The Retail catalog ID (for example, 'default_catalog').
        model_id: The ID of the Model to tune.
        project_number: The Google Cloud project number.
    """
    client = retail_v2alpha.ModelServiceClient()

    name = (
        f"projects/{project_number}/locations/{location_id}/"
        f"catalogs/{catalog_id}/models/{model_id}"
    )

    request = retail_v2alpha.TuneModelRequest(name=name)

    try:
        operation = client.tune_model(request=request)
        print(f"Triggered model tuning operation: {operation.operation.name}")

        response = operation.result()
        print(f"Model tuning completed successfully: {response}")
    except (
        exceptions.BadRequest,
        exceptions.FailedPrecondition,
        exceptions.NotFound,
        exceptions.PermissionDenied,
    ) as exc:
        print(f"Model tuning request returned: {exc}")


# [END retail_v2alpha_modelservice_tune_model]
