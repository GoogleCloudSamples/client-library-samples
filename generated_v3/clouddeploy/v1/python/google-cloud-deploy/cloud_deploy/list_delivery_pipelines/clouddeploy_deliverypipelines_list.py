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

# [START clouddeploy_v1_clouddeploy_deliverypipelines_list]
from google.api_core import exceptions
from google.cloud import deploy_v1


def list_delivery_pipelines(project_id: str) -> None:
    """Lists delivery pipelines in a Google Cloud project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = deploy_v1.CloudDeployClient()

    location_name = "us-central1"
    parent = f"projects/{project_id}/locations/{location_name}"

    request = deploy_v1.ListDeliveryPipelinesRequest(
        parent=parent,
    )

    try:
        delivery_pipelines = client.list_delivery_pipelines(request=request)
        for pipeline in delivery_pipelines:
            print(f"Delivery pipeline: {pipeline.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list delivery pipelines: {error}")
# [END clouddeploy_v1_clouddeploy_deliverypipelines_list]
