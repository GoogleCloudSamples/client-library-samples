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

# [START retail_v2_conversationalsearchservice_conversational_search]
import google.api_core.exceptions
from google.cloud import retail_v2


def conversational_search(
    project_id: str,
    visitor_id: str,
    location_id: str,
) -> None:
    """Performs a conversational search request on a product catalog.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        visitor_id: A unique identifier for tracking visitors (for example, an
          HTTP cookie string like 'visitor-123456'). Must be a UTF-8 encoded
          string with a length limit of 128 characters.
        location_id: The Google Cloud location ID. For Retail Conversational
          Search, this must be 'global'.
    """
    client = retail_v2.ConversationalSearchServiceClient()

    placement = (
        f"projects/{project_id}/locations/{location_id}"
        "/catalogs/default_catalog/placements/default_search"
    )
    branch = (
        f"projects/{project_id}/locations/{location_id}"
        "/catalogs/default_catalog/branches/0"
    )

    request = retail_v2.ConversationalSearchRequest(
        placement=placement,
        branch=branch,
        query="shoes",
        visitor_id=visitor_id,
    )

    try:
        response = client.conversational_search(request=request)
        print(f"Conversation ID: {response.conversation_id}")
    except (
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.NotFound,
    ) as exc:
        print(f"Conversational search status: {exc}")


# [END retail_v2_conversationalsearchservice_conversational_search]
