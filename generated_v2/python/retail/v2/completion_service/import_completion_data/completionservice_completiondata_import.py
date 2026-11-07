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

# [START retail_v2_completionservice_import_completion_data]
from google.api_core import exceptions
from google.cloud import retail_v2


def import_completion_data(
    project_id: str, location_id: str, catalog_id: str
) -> None:
    """Import completion suggestion data from BigQuery into a Retail catalog.

    Args:
        project_id: The Google Cloud project ID hosting the Retail catalog.
        location_id: The catalog location, typically 'global'.
        catalog_id: The Retail catalog ID, such as 'default_catalog'.
    """
    client_options = (
        {"api_endpoint": f"{location_id}-retail.googleapis.com"}
        if location_id != "global"
        else None
    )
    client = retail_v2.CompletionServiceClient(client_options=client_options)

    parent = f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"
    input_config = retail_v2.CompletionDataInputConfig(
        big_query_source=retail_v2.BigQuerySource(
            dataset_id="example_dataset",
            table_id="example_suggestions_table",
            data_schema="suggestions",
        )
    )

    try:
        request = retail_v2.ImportCompletionDataRequest(
            parent=parent,
            input_config=input_config,
        )
        operation = client.import_completion_data(request=request)
        print(f"Operation started: {operation.operation.name}")

        response = operation.result()
        print(f"Import completed successfully: {response}")
    except (
        exceptions.FailedPrecondition,
        exceptions.InvalidArgument,
        exceptions.PermissionDenied,
        exceptions.NotFound,
    ) as exc:
        if "Retail data use terms" in str(exc) or "Cloud Retail enabled" in str(exc):
            print(
                f"Retail terms must be accepted in the Google Cloud console for project: {project_id}"
            )
        else:
            print(f"Operation could not be completed: {exc.message}")
# [END retail_v2_completionservice_import_completion_data]
