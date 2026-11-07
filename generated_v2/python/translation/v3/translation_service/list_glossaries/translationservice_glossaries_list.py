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

# [START translate_v3_translationservice_glossaries_list]
import google.api_core.exceptions
from google.cloud import translate_v3

client = translate_v3.TranslationServiceClient()


def list_glossaries(project_id: str, location_id: str) -> None:
    """Lists Translation glossaries in a specified project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region (for example, 'us-central1'). Custom glossaries must be hosted and listed in a regional location.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    request = translate_v3.ListGlossariesRequest(
        parent=parent,
    )

    try:
        response = client.list_glossaries(request=request)
        for glossary in response:
            print(f"Glossary name: {glossary.name}")
            print(f"Entry count: {glossary.entry_count}")
    except google.api_core.exceptions.GoogleAPIError as exc:
        print(f"Failed to list glossaries: {exc}")
# [END translate_v3_translationservice_glossaries_list]
