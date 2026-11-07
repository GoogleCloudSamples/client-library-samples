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

# [START dataplex_v1_businessglossaryservice_glossaryterm_delete]
import google.api_core.exceptions
from google.cloud import dataplex_v1

client = dataplex_v1.BusinessGlossaryServiceClient()


def delete_glossary_term(
    location_id: str, glossary_id: str, term_id: str, project_id: str
) -> None:
    """Deletes a glossary term in Dataplex.

    Args:
        location_id: The Google Cloud region where the glossary is located (for
          example, 'us-central1').
        glossary_id: The caller-assigned identifier of the parent glossary.
        term_id: The caller-assigned identifier of the glossary term to delete.
        project_id: The Google Cloud project ID.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"glossaries/{glossary_id}/terms/{term_id}"
    )

    try:
        client.delete_glossary_term(name=name)
        print(f"Deleted glossary term: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Glossary term not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as err:
        print(f"Failed to delete glossary term: {err}")
# [END dataplex_v1_businessglossaryservice_glossaryterm_delete]
