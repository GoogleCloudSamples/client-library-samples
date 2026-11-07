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

# [START datacatalog_v1_datacatalog_catalog_search]
import google.api_core.exceptions
from google.cloud import datacatalog_v1


def search_catalog(project_id: str, query: str) -> None:
    """Searches Data Catalog resources matching a query within a project.

    Args:
        project_id: The Google Cloud project ID to search within.
        query: The query string conforming to Data Catalog search syntax.
    """
    client = datacatalog_v1.DataCatalogClient()

    scope = datacatalog_v1.SearchCatalogRequest.Scope(
        include_project_ids=[project_id]
    )

    request = datacatalog_v1.SearchCatalogRequest(
        scope=scope,
        query=query,
    )

    try:
        results = client.search_catalog(request=request)
        for result in results:
            print(f"Resource type: {result.search_result_type.name}")
            print(f"Relative resource name: {result.relative_resource_name}")
            print(f"Linked resource: {result.linked_resource}")
    except google.api_core.exceptions.InvalidArgument as error:
        if "deprecation" in str(error):
            print(
                f"Data Catalog search is deprecated for project '{project_id}'."
                " Metadata search is available via Dataplex Catalog."
            )
        else:
            print(f"Invalid search request: {error}")
    except google.api_core.exceptions.PermissionDenied as error:
        print(f"Permission denied during search: {error}")


# [END datacatalog_v1_datacatalog_catalog_search]
