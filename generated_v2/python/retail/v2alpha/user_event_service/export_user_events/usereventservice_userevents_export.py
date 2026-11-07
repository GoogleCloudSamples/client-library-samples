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

# [START retail_v2alpha_usereventservice_export_user_events]
from google.api_core import exceptions
from google.cloud import retail_v2alpha


def export_user_events(project_id: str, location_id: str, catalog_id: str) -> None:
    """Exports user events to Google Cloud Storage.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The geographic location for the catalog (for example, 'global').
        catalog_id: The ID of the Retail catalog (for example, 'default_catalog').
    """
    client = retail_v2alpha.UserEventServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"
    output_config = retail_v2alpha.OutputConfig(
        gcs_destination=retail_v2alpha.OutputConfig.GcsDestination(
            output_uri_prefix="gs://example-bucket/export_dir/"
        )
    )

    request = retail_v2alpha.ExportUserEventsRequest(
        parent=parent,
        output_config=output_config,
    )

    try:
        operation = client.export_user_events(request=request)
        print(f"Export operation initiated: {operation.operation.name}")

        response = operation.result()
        print(f"Export completed: {response}")
    except (
        exceptions.FailedPrecondition,
        exceptions.InvalidArgument,
    ) as exc:
        detail = getattr(exc, "message", None) or str(exc)
        print(f"Export operation status: {detail}")


# [END retail_v2alpha_usereventservice_export_user_events]
