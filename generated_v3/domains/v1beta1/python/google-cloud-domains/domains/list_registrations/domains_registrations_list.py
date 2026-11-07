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

# [START domains_v1beta1_domains_registrations_list]
from google.api_core.exceptions import GoogleAPICallError
from google.cloud import domains_v1beta1


def list_registrations(project_id: str, location_id: str) -> None:
    """Lists Cloud Domains registrations in a given project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = domains_v1beta1.DomainsClient()
    parent = client.common_location_path(project_id, location_id)

    try:
        response = client.list_registrations(parent=parent)
        registrations = list(response)
        if not registrations:
            print(
                f"No registrations found for project '{project_id}' in location '{location_id}'."
            )
        for registration in registrations:
            print(f"Registration name: {registration.name}")
            print(f"Domain name: {registration.domain_name}")
            print(f"State: {registration.state}")
    except GoogleAPICallError as e:
        print(f"Failed to list registrations: {e}")


# [END domains_v1beta1_domains_registrations_list]
