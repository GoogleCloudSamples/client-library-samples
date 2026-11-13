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

# [START talent_create_tenant]
from google.api_core import exceptions
from google.cloud import talent_v4


def create_tenant(project_id: str) -> None:
    """Creates a tenant for Cloud Talent Solution.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = talent_v4.TenantServiceClient()

    parent = f"projects/{project_id}"
    tenant = talent_v4.Tenant(external_id="example-tenant-12345")

    try:
        response = client.create_tenant(parent=parent, tenant=tenant)
        print(f"Created tenant: {response.name}")
        print(f"External ID: {response.external_id}")
    except (exceptions.FailedPrecondition, exceptions.InvalidArgument) as e:
        print(f"Data permission terms required: {e}")
    except exceptions.AlreadyExists as e:
        print(f"Tenant already exists: {e}")
# [END talent_create_tenant]
