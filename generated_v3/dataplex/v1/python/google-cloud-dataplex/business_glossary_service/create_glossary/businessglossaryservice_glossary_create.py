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

# [START dataplex_v1_businessglossaryservice_glossary_create]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.BusinessGlossaryServiceClient()


def create_glossary(location_id: str, glossary_id: str, project_id: str) -> None:
    """Creates a glossary in Google Cloud Dataplex.

    Args:
        location_id: Supported Google Cloud region (for example, 'us-central1').
        glossary_id: Identifier for the glossary (for example, 'example-glossary').
        project_id: Google Cloud project ID.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    glossary = dataplex_v1.Glossary(
        display_name="Example Glossary",
        description="A business glossary containing definitions and terms.",
    )

    try:
        operation = client.create_glossary(
            parent=parent,
            glossary_id=glossary_id,
            glossary=glossary,
        )
        response = operation.result()
        print(f"Created glossary: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create glossary: {e}")
# [END dataplex_v1_businessglossaryservice_glossary_create]
