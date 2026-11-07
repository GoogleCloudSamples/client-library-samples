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

# [START certificate_manager_delete_certificate]
from google.api_core import exceptions
from google.cloud import certificate_manager_v1


def delete_certificate(
    project_id: str, location_id: str, certificate_id: str
) -> None:
    """Deletes a certificate resource from Certificate Manager.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region where the certificate is located.
        certificate_id: The ID of the certificate to delete.
    """
    client = certificate_manager_v1.CertificateManagerClient()

    name = client.certificate_path(project_id, location_id, certificate_id)

    try:
        operation = client.delete_certificate(name=name)
        operation.result()
        print(f"Deleted certificate: {name}")
    except exceptions.NotFound:
        print(f"Certificate resource not found: {name}")
    except exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")


# [END certificate_manager_delete_certificate]
