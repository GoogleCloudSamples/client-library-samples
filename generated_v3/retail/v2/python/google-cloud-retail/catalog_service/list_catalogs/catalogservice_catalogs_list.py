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

# [START retail_v2_catalogservice_catalogs_list]
from google.api_core import exceptions
from google.cloud import retail_v2


def list_catalogs(project_id: str, location_id: str) -> None:
    """Lists catalogs in a specified project and location.

    Args:
        project_id: The Google Cloud project ID containing the Retail catalogs.
        location_id: The geographic location ID, typically 'global'.
    """
    client = retail_v2.CatalogServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = retail_v2.ListCatalogsRequest(parent=parent)

    try:
        response = client.list_catalogs(request=request)
        for catalog in response:
            print(f"Catalog name: {catalog.name}")
            print(f"Display name: {catalog.display_name}")
    except exceptions.FailedPrecondition:
        print(
            f"Cloud Retail data use terms require acceptance in the Google Cloud console for project {project_id}."
        )
    except exceptions.InvalidArgument as exc:
        print(f"Invalid argument provided: {exc.message}")
    except exceptions.PermissionDenied as exc:
        print(f"Permission denied: {exc.message}")
# [END retail_v2_catalogservice_catalogs_list]
