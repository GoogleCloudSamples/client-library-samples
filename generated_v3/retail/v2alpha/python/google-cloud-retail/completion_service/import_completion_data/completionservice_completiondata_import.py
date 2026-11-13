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

# [START retail_v2alpha_completionservice_import_completion_data]
import google.api_core.exceptions
from google.cloud import retail_v2alpha


def import_completion_data(
    project_id: str, location_id: str, catalog_id: str
) -> None:
    """Imports completion data into a Retail catalog.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The geographic location of the catalog, typically 'global'.
        catalog_id: The ID of the Retail catalog, typically 'default_catalog'.
    """
    if location_id != "global":
        client_options = {"api_endpoint": f"{location_id}-retail.googleapis.com"}
        client = retail_v2alpha.CompletionServiceClient(client_options=client_options)
    else:
        client = retail_v2alpha.CompletionServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"
    input_config = retail_v2alpha.CompletionDataInputConfig(
        big_query_source=retail_v2alpha.BigQuerySource(
            dataset_id="example_dataset",
            table_id="example_suggestions_table",
            data_schema="suggestions",
        )
    )

    request = retail_v2alpha.ImportCompletionDataRequest(
        parent=parent,
        input_config=input_config,
    )

    try:
        operation = client.import_completion_data(request=request)
        print(f"Triggered long-running operation: {operation.operation.name}")
        response = operation.result()
        print(f"Import completed successfully: {response}")
    except google.api_core.exceptions.FailedPrecondition as exc:
        print(f"Operation precondition status: {exc.message}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call status: {exc.message}")
# [END retail_v2alpha_completionservice_import_completion_data]
