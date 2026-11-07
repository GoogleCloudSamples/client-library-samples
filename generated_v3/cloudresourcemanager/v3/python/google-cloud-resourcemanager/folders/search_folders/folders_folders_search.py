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

# [START cloudresourcemanager_v3_folders_folders_search]
from google.api_core import exceptions
from google.cloud import resourcemanager_v3


def search_folders(query: str) -> None:
    """Search folders matching a specified query.

    Args:
        query: Search criteria used to select folders to return, for example
          "state=ACTIVE" or "displayName=example*".
    """
    client = resourcemanager_v3.FoldersClient()
    request = resourcemanager_v3.SearchFoldersRequest(query=query)

    try:
        response = client.search_folders(request=request)
        found_folders = False
        for folder in response:
            found_folders = True
            print(f"Folder name: {folder.name}")
            print(f"Display name: {folder.display_name}")
            print(f"Parent: {folder.parent}")
            print(f"State: {folder.state.name}")

        if not found_folders:
            print(f"No folders found for query: {query}")
    except exceptions.GoogleAPIError as exc:
        print(f"Failed to search folders: {exc}")
# [END cloudresourcemanager_v3_folders_folders_search]
