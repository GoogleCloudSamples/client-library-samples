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

# [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_site_create]
import google.api_core.exceptions
from google.cloud import gdchardwaremanagement_v1alpha

client = gdchardwaremanagement_v1alpha.GDCHardwareManagementClient()


def create_site(project_id: str, location_id: str, site_id: str) -> None:
    """Creates a site resource in Google Distributed Cloud Hardware Management.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location ID where the site will be created (for example, 'us-central1').
        site_id: The ID to use for the site, which will become the final component of the site's resource name (for example, 'example-site'). Must start with a lowercase letter, contain at most 63 characters (lowercase letters, numbers, and hyphens), and cannot end with a hyphen.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    postal_address = {
        "region_code": "US",
        "administrative_area": "CA",
        "locality": "Mountain View",
        "postal_code": "94043",
        "address_lines": ["1600 Amphitheatre Pkwy"],
    }
    contact = gdchardwaremanagement_v1alpha.Contact(
        given_name="Alex",
        email="alex@example.com",
        phone="+16505550123",
    )
    organization_contact = gdchardwaremanagement_v1alpha.OrganizationContact(
        address=postal_address,
        contacts=[contact],
    )
    site = gdchardwaremanagement_v1alpha.Site(
        display_name="Example Site",
        description="An example GDCH site.",
        organization_contact=organization_contact,
    )

    try:
        operation = client.create_site(
            parent=parent,
            site_id=site_id,
            site=site,
        )
        response = operation.result()
        print(f"Created site: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create site: {e}")
# [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_site_create]
