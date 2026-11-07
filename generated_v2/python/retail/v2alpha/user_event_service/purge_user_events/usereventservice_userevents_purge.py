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

# [START retail_v2alpha_usereventservice_purge_user_events]
import google.api_core.exceptions
from google.cloud import retail_v2


def purge_user_events(project_id: str, catalog_id: str, location_id: str) -> None:
    """Purge user events matching a specified filter.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        catalog_id: ID of the Catalog (for example, 'example-catalog-id').
        location_id: The Google Cloud location ID (for example, 'global').
    """
    client = retail_v2.UserEventServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"
    filter = 'visitorId = "example-visitor-id"'
    force = True

    request = retail_v2.PurgeUserEventsRequest(
        parent=parent,
        filter=filter,
        force=force,
    )

    try:
        operation = client.purge_user_events(request=request)
        print(f"Waiting for operation {operation.operation.name} to complete...")
        response = operation.result()
        print(f"Purged events count: {response.purged_events_count}")
    except google.api_core.exceptions.FailedPrecondition as exc:
        print(f"Prerequisite not met: {exc.message}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Request could not be completed: {exc.message}")


# [END retail_v2alpha_usereventservice_purge_user_events]
