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

# [START monitoring_v3_servicemonitoringservice_servicelevelobjective_get]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def get_service_level_objective(
    project_id: str,
    service_id: str,
    slo_id: str,
) -> None:
    """
    Retrieve a Service-Level Objective (SLO) from Google Cloud Monitoring.

    Args:
        project_id: Your Google Cloud Project ID.
        service_id: The ID of the service that the SLO belongs to.
        slo_id: The ID of the Service-Level Objective to retrieve.
    """
    client = monitoring_v3.ServiceMonitoringServiceClient()

    slo_name = client.service_level_objective_path(project_id, service_id, slo_id)

    try:
        slo = client.get_service_level_objective(name=slo_name)

        print(f"Service Level Objective: {slo.name}")
        if slo.calendar_period:
            print(
                f"  Calendar Period: {monitoring_v3.ServiceLevelObjective.CalendarPeriod(slo.calendar_period).name}"
            )
        print(f"  Display Name: {slo.display_name}")
        print(f"  Goal: {slo.goal}")
        if slo.rolling_period:
            print(f"  Rolling Period: {slo.rolling_period.seconds} seconds")

    except exceptions.NotFound:
        print(f"Error: Service-Level Objective '{slo_name}' not found.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_servicemonitoringservice_servicelevelobjective_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve a Service-Level Objective (SLO) from Google Cloud Monitoring."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud Project ID.",
    )
    parser.add_argument(
        "--service_id",
        type=str,
        required=True,
        help="The ID of the service that the SLO belongs to.",
    )
    parser.add_argument(
        "--slo_id",
        type=str,
        required=True,
        help="The ID of the Service-Level Objective to retrieve.",
    )
    args = parser.parse_args()

    get_service_level_objective(
        project_id=args.project_id, service_id=args.service_id, slo_id=args.slo_id
    )
