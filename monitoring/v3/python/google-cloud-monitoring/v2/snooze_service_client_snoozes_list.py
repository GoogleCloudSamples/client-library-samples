# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START monitoring_v3_snoozeservice_snoozes_list]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def list_snoozes(project_id: str) -> None:
    """Lists snoozes for a given Google Cloud project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = monitoring_v3.SnoozeServiceClient()
    parent = f"projects/{project_id}"

    try:
        page_result = client.list_snoozes(parent=parent)

        found_snoozes = False
        for snooze in page_result:
            found_snoozes = True
            print(f"Snooze: {snooze.name}")
            if snooze.criteria.policies:
                print(
                    f"    Affected Alert Policy IDs: {snooze.criteria.policies}"
                )
            else:
                print("    Affected Alert Policy IDs: All policies")
            print(f"    Display Name: {snooze.display_name}")
            print(f"    Interval End Time: {snooze.interval.end_time.isoformat()}")
            print(f"    Interval Start Time: {snooze.interval.start_time.isoformat()}")

        if not found_snoozes:
            print("No snoozes found for this project.")

    except exceptions.PermissionDenied as e:
        print(
            f"Error: Permission denied. Please ensure the service account or user has "
            f"the 'Monitoring Viewer' role or equivalent permissions for project '{project_id}'."
        )
        print(f"Details: {e}")
    except exceptions.NotFound as e:
        print(f"Error: Project '{project_id}' not found or inaccessible.")
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_snoozeservice_snoozes_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists snoozes for a given Google Cloud project."
    )
    parser.add_argument("--project_id", required=True, help="The Google Cloud project ID.")
    args = parser.parse_args()
    list_snoozes(project_id=args.project_id)
