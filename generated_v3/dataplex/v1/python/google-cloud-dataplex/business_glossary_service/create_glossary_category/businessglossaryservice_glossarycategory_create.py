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

# [START dataplex_v1_businessglossaryservice_glossarycategory_create]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.BusinessGlossaryServiceClient()


def create_glossary_category(
    location_id: str, glossary_id: str, category_id: str, project_id: str
) -> None:
    """Creates a glossary category within a Google Cloud Dataplex glossary.

    Args:
        location_id: The Google Cloud region where the parent glossary exists (for example, 'us-central1').
        glossary_id: The ID of the parent glossary.
        category_id: The caller-chosen identifier for the category.
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}/locations/{location_id}/glossaries/{glossary_id}"
    category = dataplex_v1.GlossaryCategory(
        parent=parent,
        display_name="Example Category",
        description="A category for organizing glossary terms.",
    )

    try:
        response = client.create_glossary_category(
            parent=parent,
            category_id=category_id,
            category=category,
        )
        print(f"Created glossary category: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create glossary category: {error}")


# [END dataplex_v1_businessglossaryservice_glossarycategory_create]
