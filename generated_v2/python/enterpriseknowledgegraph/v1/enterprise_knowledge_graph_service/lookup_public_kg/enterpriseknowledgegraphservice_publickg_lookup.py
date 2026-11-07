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

# [START enterpriseknowledgegraph_v1_enterpriseknowledgegraphservice_lookup_public_kg]
import google.api_core.exceptions
from google.cloud import enterpriseknowledgegraph_v1


def lookup_public_kg(project_id: str, location_id: str) -> None:
    """Look up entities in the Public Knowledge Graph.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
    """
    client = enterpriseknowledgegraph_v1.EnterpriseKnowledgeGraphServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    ids = "/m/02mjmr"

    request = enterpriseknowledgegraph_v1.LookupPublicKgRequest(
        parent=parent,
        ids=[ids],
    )

    try:
        response = client.lookup_public_kg(request=request)
        print(f"Lookup response: {response}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END enterpriseknowledgegraph_v1_enterpriseknowledgegraphservice_lookup_public_kg]
