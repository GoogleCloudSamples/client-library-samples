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

# [START monitoring_v3_servicemonitoringservice_servicelevelobjective_delete]
from google.api_core import exceptions
from google.cloud import monitoring_v3


def delete_service_level_objective(
    project_id: str,
    service_id: str,
    slo_id: str,
) -> None:
    """
    Deletes a Service-Level Objective (SLO) from a Google Cloud Monitoring service.

    Args:
        project_id: The Google Cloud project ID.
        service_id: The ID of the service from which to delete the SLO.
        slo_id: The ID of the Service-Level Objective to delete.
    """
    client = monitoring_v3.ServiceMonitoringServiceClient()
    name = client.service_level_objective_path(project_id, service_id, slo_id)

    try:
        client.delete_service_level_objective(name=name)
        print(f"Deleted Service-Level Objective: {name}")
    except exceptions.NotFound:
        print(
            f"Service-Level Objective {name} not found. "
            "It may have already been deleted or never existed."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"Error deleting Service-Level Objective {name}: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END monitoring_v3_servicemonitoringservice_servicelevelobjective_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a Service-Level Objective (SLO) from a Google Cloud Monitoring service."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--service_id",
        required=True,
        help="The ID of the service from which to delete the SLO.",
    )
    parser.add_argument(
        "--slo_id",
        required=True,
        help="The ID of the Service-Level Objective to delete.",
    )
    args = parser.parse_args()
    delete_service_level_objective(
        project_id=args.project_id, service_id=args.service_id, slo_id=args.slo_id
    )
