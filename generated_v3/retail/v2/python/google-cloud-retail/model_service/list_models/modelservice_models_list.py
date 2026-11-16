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

# [START retail_list_models]
from google.api_core import exceptions
from google.cloud import retail_v2


def list_models(catalog_id: str, location_id: str, project_id: str) -> None:
    """Lists recommendation models in a Cloud Retail catalog.

    Args:
        catalog_id: The Retail catalog ID (for example, 'default_catalog').
        location_id: The Google Cloud location ID (for example, 'global').
        project_id: The Google Cloud project ID.
    """
    client = retail_v2.ModelServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"

    request = retail_v2.ListModelsRequest(parent=parent)

    try:
        response = client.list_models(request=request)
        for model in response:
            print(f"Model Name: {model.name}")
            print(f"Display Name: {model.display_name}")
            print(f"Model Type: {model.type_}")
    except (exceptions.InvalidArgument, exceptions.FailedPrecondition) as error:
        if "Retail data use terms" in str(error):
            print(
                f"Cloud Retail terms have not been accepted for project {project_id}."
            )
        else:
            print(f"API request could not be completed: {error.message or error}")
# [END retail_list_models]
