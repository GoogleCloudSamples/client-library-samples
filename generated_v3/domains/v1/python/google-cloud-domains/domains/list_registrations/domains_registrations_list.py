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

# [START domains_v1_domains_registrations_list]
import google.api_core.exceptions
from google.cloud import domains_v1


def list_registrations(project_id: str, location_id: str) -> None:
    """Lists domain registrations in a project and location.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location for Cloud Domains (use 'global').
    """
    client = domains_v1.DomainsClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = domains_v1.ListRegistrationsRequest(
        parent=parent,
    )

    try:
        response = client.list_registrations(request=request)
        found = False
        for registration in response:
            found = True
            print(f"Name: {registration.name}")
            print(f"Domain: {registration.domain_name}")
            print(f"State: {registration.state.name}")
        if not found:
            print("No registrations found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed with error: {error}")
# [END domains_v1_domains_registrations_list]
