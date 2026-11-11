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

# [START container_v1_clustermanager_set_logging_service]
import google.api_core.exceptions
from google.cloud import container_v1

client = container_v1.ClusterManagerClient()


def set_logging_service(project_id: str, location_id: str, cluster_id: str) -> None:
    """Sets the logging service configuration for an existing GKE cluster.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or zone for the cluster.
        cluster_id: The caller-chosen name or ID of the GKE cluster to update logging for.
    """
    logging_service = "logging.googleapis.com/kubernetes"

    cluster_name = (
        f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}"
    )
    request = container_v1.SetLoggingServiceRequest(
        name=cluster_name,
        logging_service=logging_service,
    )

    try:
        operation = client.set_logging_service(request=request)
        print(f"Logging service update initiated. Operation name: {operation.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error updating logging service: {error.message}")
# [END container_v1_clustermanager_set_logging_service]
