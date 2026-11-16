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

# [START oracledatabase_v1_oracledatabase_cloudexadatainfrastructure_create]
import google.api_core.exceptions
from google.cloud import oracledatabase_v1


def create_cloud_exadata_infrastructure(
    project_id: str, location_id: str, cloud_exadata_infrastructure_id: str
) -> None:
    """Creates an Oracle Cloud Exadata Infrastructure resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        cloud_exadata_infrastructure_id: The identifier of the Cloud Exadata Infrastructure (for example, 'example-cloudexadatainfrastructure-id').
    """
    client = oracledatabase_v1.OracleDatabaseClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    cloud_exadata_infrastructure = oracledatabase_v1.CloudExadataInfrastructure(
        display_name="Example Exadata Infrastructure",
        properties=oracledatabase_v1.CloudExadataInfrastructureProperties(
            shape="Exadata.X9M",
            compute_count=2,
            storage_count=3,
        ),
    )

    try:
        operation = client.create_cloud_exadata_infrastructure(
            parent=parent,
            cloud_exadata_infrastructure_id=cloud_exadata_infrastructure_id,
            cloud_exadata_infrastructure=cloud_exadata_infrastructure,
        )
        response = operation.result()
        print(f"Created Cloud Exadata Infrastructure: {response.name}")
    except google.api_core.exceptions.AlreadyExists:
        print(
            f"Cloud Exadata Infrastructure already exists: {cloud_exadata_infrastructure_id}"
        )
    except google.api_core.exceptions.BadRequest as e:
        if "ENTITLEMENT_NOT_FOUND" in str(e):
            print(
                "A marketplace order is required to provision the Cloud Exadata Infrastructure."
            )
        else:
            print(f"Bad request: {e.message}")
# [END oracledatabase_v1_oracledatabase_cloudexadatainfrastructure_create]
