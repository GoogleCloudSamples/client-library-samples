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

# [START domains_v1_domains_registration_delete]
import google.api_core.exceptions
from google.cloud import domains_v1


def delete_registration(
    project_id: str, location_id: str, registration_id: str
) -> None:
    """Deletes a domain registration.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (for example, 'global').
        registration_id: The domain name of the registration (for example, 'example.com').
    """
    client = domains_v1.DomainsClient()
    name = f"projects/{project_id}/locations/{location_id}/registrations/{registration_id}"

    try:
        # DeleteRegistration initiates a long-running operation.
        operation = client.delete_registration(name=name)
        operation.result()
        print(f"Deleted registration: {name}")
    except google.api_core.exceptions.NotFound:
        # Treat an already absent resource as successfully deleted for idempotent execution.
        print(f"Deleted registration: {name}")
    except google.api_core.exceptions.FailedPrecondition as error:
        print(f"Registration precondition failed: {error}")


# [END domains_v1_domains_registration_delete]
