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

# [START dataplex_v1_businessglossaryservice_glossaryterm_update]
import os

import google.api_core.exceptions
import google.auth
import google.auth.exceptions
from google.cloud import dataplex_v1
from google.protobuf import field_mask_pb2


def update_glossary_term(location_id: str, glossary_id: str, term_id: str) -> None:
    """Updates a glossary term.

    Args:
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        glossary_id: ID of the Glossary (for example, 'example-glossary-id').
        term_id: ID of the Term (for example, 'example-term-id').
    """
    client = dataplex_v1.BusinessGlossaryServiceClient()

    project_id_or_number = os.getenv("GOOGLE_CLOUD_PROJECT")
    if not project_id_or_number:
        try:
            _, project_id_or_number = google.auth.default()
        except google.auth.exceptions.DefaultCredentialsError:
            project_id_or_number = "example-project-id"
    if not project_id_or_number:
        project_id_or_number = "example-project-id"

    term = dataplex_v1.GlossaryTerm(
        name=f"projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id}",
        description="Updated description for the glossary term.",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        response = client.update_glossary_term(
            term=term,
            update_mask=update_mask,
        )
        print(f"Updated glossary term: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update glossary term: {e}")
# [END dataplex_v1_businessglossaryservice_glossaryterm_update]
