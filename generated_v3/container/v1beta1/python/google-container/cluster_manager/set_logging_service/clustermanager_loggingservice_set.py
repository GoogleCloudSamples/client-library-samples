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

# [START container_v1beta1_clustermanager_set_logging_service]
import google.api_core.exceptions
from google.cloud import container_v1beta1

client = container_v1beta1.ClusterManagerClient()


def set_logging_service(project_id: str, location_id: str, cluster_id: str) -> None:
    """Sets the logging service for a cluster.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or zone where the cluster is located
            (for example, 'us-central1' or 'us-central1-a').
        cluster_id: The identifier of the cluster.
    """
    logging_service = "logging.googleapis.com/kubernetes"
    name = f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}"

    request = container_v1beta1.SetLoggingServiceRequest(
        name=name,
        logging_service=logging_service,
    )

    try:
        response = client.set_logging_service(request=request)
        print(f"Updated logging service. Operation name: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to set logging service: {e}")
# [END container_v1beta1_clustermanager_set_logging_service]
