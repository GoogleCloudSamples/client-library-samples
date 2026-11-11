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

# [START enterpriseknowledgegraph_v1_enterpriseknowledgegraphservice_lookup]
import google.api_core.exceptions
from google.cloud import enterpriseknowledgegraph_v1


def lookup(project_id: str, location_id: str, ids: str) -> None:
    """Looks up entities in Cloud Knowledge Graph using entity IDs.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region or location for the Enterprise
          Knowledge Graph (for example, 'global' or 'us-central1').
        ids: The Cloud Knowledge Graph entity IDs to look up (for example,
          '/m/045c7b' or 'kg:/m/045c7b').
    """
    client = enterpriseknowledgegraph_v1.EnterpriseKnowledgeGraphServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    # Normalize entity IDs by removing CURIE prefixes (such as "kg:") if present.
    clean_ids = []
    for item in ids.split(","):
        cleaned = item.strip()
        if cleaned.startswith("kg:"):
            cleaned = cleaned[3:]
        if not cleaned.startswith("/") and (
            cleaned.startswith("m/") or cleaned.startswith("g/")
        ):
            cleaned = f"/{cleaned}"
        if cleaned:
            clean_ids.append(cleaned)

    request = enterpriseknowledgegraph_v1.LookupRequest(
        parent=parent,
        ids=clean_ids,
    )

    try:
        response = client.lookup(request=request)
        print(f"Entities found: {len(response.item_list_element)}")
        for item in response.item_list_element:
            print(f"Item: {item}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Lookup failed with error: {e}")


# [END enterpriseknowledgegraph_v1_enterpriseknowledgegraphservice_lookup]
