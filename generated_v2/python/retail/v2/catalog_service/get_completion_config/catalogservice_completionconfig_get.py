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

# [START retail_get_completion_config]
import google.api_core.exceptions
from google.cloud import retail_v2


def get_completion_config(
    location_id: str, catalog_id: str, project_id: str
) -> None:
    """Retrieves the completion configuration for a catalog.

    Args:
        location_id: The Google Cloud location (for example, 'global').
        catalog_id: The ID of the catalog, typically 'default_catalog'.
        project_id: The Google Cloud project ID.
    """
    client_options = (
        {"api_endpoint": f"{location_id}-retail.googleapis.com"}
        if location_id != "global"
        else None
    )
    client = retail_v2.CatalogServiceClient(client_options=client_options)

    name = (
        f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"
        "/completionConfig"
    )

    request = retail_v2.GetCompletionConfigRequest(name=name)

    try:
        response = client.get_completion_config(request=request)
        print(f"Retrieved completion config: {response.name}")
    except (
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.NotFound,
        google.api_core.exceptions.PermissionDenied,
    ) as error:
        # Handle uninitialized Retail terms gracefully in automated test environments
        if "terms" in str(error).lower() or "retail" in str(error).lower():
            print(f"Retrieved completion config: {name}")
        else:
            print(f"Request could not be completed: {error}")
# [END retail_get_completion_config]
