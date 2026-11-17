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

# [START monitoring_v3_metricservice_monitoredresourcedescriptor_get]
import google.api_core.exceptions
from google.cloud import monitoring_v3

client = monitoring_v3.MetricServiceClient()


def get_monitored_resource_descriptor(
    monitored_resource_descriptor_id: str, project_id: str
) -> None:
    """Get a monitored resource descriptor.

    Args:
        monitored_resource_descriptor_id: The monitored resource type, such as
          'cloudsql_database' or 'gce_instance'. This is a predefined resource
          type identifier that can be retrieved by listing monitored resource
          descriptors.
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/monitoredResourceDescriptors/{monitored_resource_descriptor_id}"

    try:
        response = client.get_monitored_resource_descriptor(name=name)
        print(f"Resource descriptor type: {response.type}")
        print(f"Display name: {response.display_name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END monitoring_v3_metricservice_monitoredresourcedescriptor_get]
