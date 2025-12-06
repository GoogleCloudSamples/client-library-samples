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

# [START monitoring_v3_servicemonitoringservice_servicelevelobjectives_list]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def list_service_level_objectives(project_id: str, service_id: str) -> None:
    """Lists Service Level Objectives (SLOs) for a given service.

    Args:
        project_id: The Google Cloud project ID.
        service_id: The ID of the service for which to list SLOs. E.g., 'my-app-service'
    """
    client = monitoring_v3.ServiceMonitoringServiceClient()

    parent = client.service_path(project_id, service_id)

    try:
        request = monitoring_v3.ListServiceLevelObjectivesRequest(
            parent=parent,
        )

        page_result = client.list_service_level_objectives(request=request)

        found_slos = False
        for slo in page_result:
            found_slos = True
            print(f"Service Level Objective: {slo.name}")
            if slo.calendar_period:
                print(
                    "  Calendar Period:"
                    f" {monitoring_v3.ServiceLevelObjective.CalendarPeriod(slo.calendar_period).name}"
                )
            print(f"  Display Name: {slo.display_name}")
            print(f"  Goal: {slo.goal}")
            if slo.rolling_period:
                print(f"  Rolling Period: {slo.rolling_period.seconds} seconds")
        if not found_slos:
            print(f"No SLOs found for service {service_id}")

    except exceptions.NotFound as e:
        print(
            f"Error: The specified service '{service_id}' or project '{project_id}' was not found."
        )
        print(
            "Please ensure the project ID and service ID are correct and the service"
            f" exists. Details: {e}"
        )
    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_servicemonitoringservice_servicelevelobjectives_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Service Level Objectives (SLOs) for a given service."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--service_id",
        required=True,
        help="The ID of the service for which to list SLOs.",
    )
    args = parser.parse_args()
    list_service_level_objectives(
        project_id=args.project_id, service_id=args.service_id
    )
