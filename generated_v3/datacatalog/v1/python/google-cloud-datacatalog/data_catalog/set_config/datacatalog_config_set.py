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

# [START datacatalog_v1_datacatalog_set_config]
import os

import google.api_core.exceptions
from google.cloud import datacatalog_v1


def set_config(organization_id: str, location_id: str) -> None:
    """Sets the configuration for Data Catalog.

    Args:
        organization_id: The Google Cloud Organization ID (for example,
            '123456789012').
        location_id: The Google Cloud region or location for the configuration
            (for example, 'global' or 'us-central1').
    """
    client = datacatalog_v1.DataCatalogClient()

    name = f"organizations/{organization_id}/locations/{location_id}"
    if not organization_id:
        org_id = os.environ.get("GOOGLE_CLOUD_ORGANIZATION") or os.environ.get(
            "ORGANIZATION_ID"
        )
        if org_id:
            name = f"organizations/{org_id}/locations/{location_id}"
        else:
            project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")
            name = f"projects/{project_id}/locations/{location_id}"

    tag_template_migration = (
        datacatalog_v1.TagTemplateMigration.TAG_TEMPLATE_MIGRATION_ENABLED
    )

    request = datacatalog_v1.SetConfigRequest(
        name=name,
        tag_template_migration=tag_template_migration,
    )

    try:
        response = client.set_config(request=request)
        print(f"Config successfully set for: {name}")
        print(f"Tag template migration state: {response.tag_template_migration}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to set configuration: {e}")


# [END datacatalog_v1_datacatalog_set_config]
