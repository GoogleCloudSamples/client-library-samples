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

# [START rapidmigrationassessment_v1_rapidmigrationassessment_collectors_list]
from google.api_core import exceptions
from google.cloud import rapidmigrationassessment_v1


def list_collectors(project_id: str, location_id: str) -> None:
    """Lists Rapid Migration Assessment collectors in a given location.

    Args:
        project_id: Google Cloud project ID.
        location_id: Google Cloud region or location ID.
    """
    client = rapidmigrationassessment_v1.RapidMigrationAssessmentClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = rapidmigrationassessment_v1.ListCollectorsRequest(
        parent=parent,
    )

    try:
        response = client.list_collectors(request=request)
        has_collectors = False
        for collector in response:
            has_collectors = True
            print(f"Collector name: {collector.name}")
            print(f"Display name: {collector.display_name}")

        if not has_collectors:
            print(f"No collectors found in {parent}.")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list collectors: {error.message}")
# [END rapidmigrationassessment_v1_rapidmigrationassessment_collectors_list]
