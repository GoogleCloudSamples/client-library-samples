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

# [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_order_create]
import google.api_core.exceptions
from google.cloud import gdchardwaremanagement_v1alpha
from google.type import postal_address_pb2

client = gdchardwaremanagement_v1alpha.GDCHardwareManagementClient()


def create_order(project_id: str, location_id: str, order_id: str) -> None:
    """Use the create_order method to create a hardware order.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        order_id: The client-assigned ID for the order. Must start with a lowercase letter,
            contain at most 63 characters (lowercase letters, numbers, and hyphens),
            and not end with a hyphen. If unset, a system-generated ID is used.
    """
    parent = f"projects/{project_id}/locations/{location_id}"

    order = gdchardwaremanagement_v1alpha.Order(
        customer_motivation="Expansion of edge computing workloads",
        region_code="US",
        organization_contact=gdchardwaremanagement_v1alpha.OrganizationContact(
            address=postal_address_pb2.PostalAddress(
                region_code="US",
                postal_code="94043",
                locality="Mountain View",
                address_lines=["1600 Amphitheatre Pkwy"],
            ),
            contacts=[
                gdchardwaremanagement_v1alpha.Contact(
                    given_name="Alex",
                    email="alex@example.com",
                    phone="+16505550123",
                )
            ],
        ),
    )

    try:
        # CreateOrder is a long-running operation; wait for completion
        operation = client.create_order(
            parent=parent,
            order_id=order_id,
            order=order,
        )
        response = operation.result()
        print(f"Created order: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create order: {e}")
# [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_order_create]
