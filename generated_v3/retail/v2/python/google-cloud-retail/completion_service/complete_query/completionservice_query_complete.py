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

# [START retail_v2_completionservice_complete_query]
import google.api_core.exceptions
from google.cloud import retail_v2


def complete_query(project_id: str) -> None:
    """Completes query suggestions for a search query.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = retail_v2.CompletionServiceClient()

    catalog = f"projects/{project_id}/locations/global/catalogs/default_catalog"
    query = "shoes"

    request = retail_v2.CompleteQueryRequest(
        catalog=catalog,
        query=query,
    )

    try:
        response = client.complete_query(request=request)
        for result in response.completion_results:
            print(f"Suggestion: {result.suggestion}")
        print(f"Query completed for catalog: {catalog}")
    except (
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.FailedPrecondition,
    ) as exc:
        if "terms" in str(exc) or "Retail" in str(exc):
            print(f"Cloud Retail terms acceptance required for {project_id}.")
        else:
            print(f"Query completion request: {exc.message}")
# [END retail_v2_completionservice_complete_query]
