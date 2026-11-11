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

# [START discoveryengine_v1beta_samplequeryservice_import_sample_queries]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta


def import_sample_queries(
    project_id: str, location_id: str, sample_query_set_id: str
) -> None:
    """Imports sample queries into a sample query set.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'global').
        sample_query_set_id: ID of the SampleQuerySet (for example, 'example-sample-query-set-id').
    """
    client = discoveryengine_v1beta.SampleQueryServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/sampleQuerySets/{sample_query_set_id}"

    inline_source = discoveryengine_v1beta.ImportSampleQueriesRequest.InlineSource(
        sample_queries=[
            discoveryengine_v1beta.SampleQuery(
                query_entry=discoveryengine_v1beta.SampleQuery.QueryEntry(
                    query="example search query",
                ),
            ),
        ]
    )

    request = discoveryengine_v1beta.ImportSampleQueriesRequest(
        parent=parent,
        inline_source=inline_source,
    )

    try:
        operation = client.import_sample_queries(request=request)
        response = operation.result()
        print(f"Operation completed successfully: {operation.operation.name}")
        print(f"Import response: {response}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Sample query import failed: {e.message}")
# [END discoveryengine_v1beta_samplequeryservice_import_sample_queries]
