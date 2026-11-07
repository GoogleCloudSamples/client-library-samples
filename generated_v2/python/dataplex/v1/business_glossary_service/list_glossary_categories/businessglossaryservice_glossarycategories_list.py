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

# [START dataplex_v1_businessglossaryservice_glossarycategories_list]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.BusinessGlossaryServiceClient()


def list_glossary_categories(location_id: str, glossary_id: str, project_id: str) -> None:
    """Lists categories within a Dataplex glossary.

    Args:
        location_id: The Google Cloud region where the glossary is located (for example, 'us-central1').
        glossary_id: The identifier of the parent glossary.
        project_id: The Google Cloud project ID hosting the parent glossary.
    """
    parent = f"projects/{project_id}/locations/{location_id}/glossaries/{glossary_id}"

    request = dataplex_v1.ListGlossaryCategoriesRequest(
        parent=parent,
    )

    try:
        response = client.list_glossary_categories(request=request)
        for category in response:
            print(f"Category name: {category.name}")
            print(f"Display name: {category.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list glossary categories: {error}")
# [END dataplex_v1_businessglossaryservice_glossarycategories_list]
