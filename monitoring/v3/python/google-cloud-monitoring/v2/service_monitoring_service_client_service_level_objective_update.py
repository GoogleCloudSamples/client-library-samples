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

# [START monitoring_v3_servicemonitoringservice_servicelevelobjective_update]
from google.api_core import exceptions
from google.cloud import monitoring_v3
from google.protobuf import field_mask_pb2


def update_service_level_objective(
    project_id: str,
    service_id: str,
    slo_id: str,
) -> None:
    """Updates a Service Level Objective (SLO) in Google Cloud Monitoring.

    Args:
        project_id: Your Google Cloud Project ID.
        service_id: The ID of the service under which the SLO exists.
        slo_id: The ID of the Service Level Objective to update.
    """
    new_display_name = "Updated SLO Display Name Example"
    new_goal = 0.999

    client = monitoring_v3.ServiceMonitoringServiceClient()
    slo_name = client.service_level_objective_path(project_id, service_id, slo_id)

    try:
        existing_slo = client.get_service_level_objective(name=slo_name)

        existing_slo.display_name = new_display_name
        existing_slo.goal = new_goal

        update_mask = field_mask_pb2.FieldMask(paths=["display_name", "goal"])

        request = monitoring_v3.UpdateServiceLevelObjectiveRequest(
            service_level_objective=existing_slo,
            update_mask=update_mask,
        )

        updated_slo = client.update_service_level_objective(request=request)

        print(f"Service Level Objective: {updated_slo.name}")
        print(f"  Display Name: {updated_slo.display_name}")
        print(f"  Goal: {updated_slo.goal}")

    except exceptions.NotFound:
        print(f"Error: Service Level Objective '{slo_name}' not found.")
        print(
            "Please ensure the project ID, service ID, and SLO ID are correct "
            "and the SLO exists."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")


# [END monitoring_v3_servicemonitoringservice_servicelevelobjective_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a Service Level Objective (SLO) in Google Cloud Monitoring."
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
        help="The ID of the service under which the SLO exists.",
    )
    parser.add_argument(
        "--slo_id",
        type=str,
        required=True,
        help="The ID of the Service Level Objective to update.",
    )

    args = parser.parse_args()

    update_service_level_objective(
        project_id=args.project_id,
        service_id=args.service_id,
        slo_id=args.slo_id,
    )
