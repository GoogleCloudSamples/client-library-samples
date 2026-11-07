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

# [START dataplex_v1_businessglossaryservice_glossaries_list]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.BusinessGlossaryServiceClient()


def list_glossaries(location_id: str, project_id: str) -> None:
    """Lists business glossaries in a specified project and location.

    Args:
        location_id: The Google Cloud region (for example, 'us-central1').
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = dataplex_v1.ListGlossariesRequest(
        parent=parent,
    )

    try:
        glossaries = client.list_glossaries(request=request)
        for glossary in glossaries:
            print(f"Name: {glossary.name}")
            print(f"Display Name: {glossary.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list glossaries: {error}")
# [END dataplex_v1_businessglossaryservice_glossaries_list]
