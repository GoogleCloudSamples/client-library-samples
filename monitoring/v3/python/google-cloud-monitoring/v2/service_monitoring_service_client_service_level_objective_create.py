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

# [START monitoring_v3_servicemonitoringservice_servicelevelobjective_create]
from google.api_core import exceptions
from google.cloud import monitoring_v3
from google.protobuf import duration_pb2


def create_service_level_objective(project_id: str, service_id: str) -> None:
    """Creates a Service Level Objective (SLO) for a given service.

    Args:
        project_id: The Google Cloud project ID.
        service_id: The ID of the service to create the SLO for.
    """
    client = monitoring_v3.ServiceMonitoringServiceClient()
    parent = client.service_path(project_id, service_id)

    sli = monitoring_v3.ServiceLevelIndicator(
        request_based=monitoring_v3.RequestBasedSli(
            good_total_ratio=monitoring_v3.TimeSeriesRatio(
                # Example filters
                good_service_filter=(
                    'metric.type="storage.googleapis.com/api/request_count" '
                    'AND resource.type="gcs_bucket"'
                ),
                total_service_filter=(
                    'metric.type="storage.googleapis.com/api/request_count"  '
                    'AND resource.type="gcs_bucket"'
                ),
            )
        )
    )

    slo = monitoring_v3.ServiceLevelObjective(
        display_name=f"99% Success Ratio for {service_id}",
        goal=0.99,  # 99% success ratio
        # Evaluate over a 7-day rolling period (604800 seconds)
        rolling_period=duration_pb2.Duration(seconds=7 * 24 * 60 * 60),
        service_level_indicator=sli,
    )

    request = monitoring_v3.CreateServiceLevelObjectiveRequest(
        parent=parent,
        service_level_objective_id="99-percent-success-ratio",
        service_level_objective=slo,
    )

    try:
        response = client.create_service_level_objective(request=request)
        print(f"Service Level Objective: {response.name}")
        print(f"  Display Name: {response.display_name}")
        print(f"  Goal: {response.goal}")
        if response.rolling_period:
            print(
                f"  Rolling Period: {response.rolling_period.seconds / (24*60*60)} days"
            )
    except exceptions.AlreadyExists as e:
        print(
            f"Error: SLO '99-percent-success-ratio' already exists for service '{service_id}'."
        )
    except exceptions.NotFound as e:
        print(
            f"Error: Parent service '{service_id}' not found in project '{project_id}'."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_servicemonitoringservice_servicelevelobjective_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a Service Level Objective (SLO) for a given service."
    )
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID.",
        required=True,
    )
    parser.add_argument(
        "--service_id",
        help="The ID of the service to create the SLO for.",
        required=True,
    )
    args = parser.parse_args()
    create_service_level_objective(
        project_id=args.project_id, service_id=args.service_id
    )
