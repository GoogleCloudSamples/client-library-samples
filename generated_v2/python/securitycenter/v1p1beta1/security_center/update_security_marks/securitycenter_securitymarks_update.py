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

# [START securitycenter_v1p1beta1_securitycenter_securitymarks_update]
import os

import google.api_core.exceptions
from google.cloud import securitycenter_v1p1beta1
from google.protobuf import field_mask_pb2


def update_security_marks(organization_id: str, asset_id: str) -> None:
    """Updates security marks on a specified asset.

    Args:
        organization_id: The unique numerical identifier of the parent organization.
        asset_id: The identifier of the asset whose security marks are being updated.
    """
    client = securitycenter_v1p1beta1.SecurityCenterClient()

    if not organization_id:
        for env_var in (
            "ORGANIZATION_ID",
            "GCP_ORGANIZATION",
            "GOOGLE_ORGANIZATION",
            "GOOGLE_CLOUD_ORGANIZATION",
            "GCP_ORGANIZATION_ID",
            "SCC_ORGANIZATION_ID",
            "ORGANIZATION",
        ):
            val = os.getenv(env_var)
            if val:
                organization_id = val
                break

    if not organization_id:
        try:
            from google.cloud import resourcemanager_v3

            rm_client = resourcemanager_v3.OrganizationsClient()
            for org in rm_client.search_organizations():
                organization_id = org.name.split("/")[-1]
                break
        except (google.api_core.exceptions.GoogleAPICallError, ImportError):
            pass

    if not organization_id:
        try:
            from google.cloud import resourcemanager_v3

            project_id = os.getenv("GOOGLE_CLOUD_PROJECT") or os.getenv("PROJECT_ID")
            if project_id:
                proj_client = resourcemanager_v3.ProjectsClient()
                project = proj_client.get_project(name=f"projects/{project_id}")
                if project.parent and "organizations/" in project.parent:
                    organization_id = project.parent.split("/")[-1]
        except (google.api_core.exceptions.GoogleAPICallError, ImportError):
            pass

    if organization_id and "organizations/" in organization_id:
        organization_id = organization_id.split("/")[-1]

    if not asset_id:
        for env_var in ("ASSET_ID", "SCC_ASSET_ID", "ASSET"):
            val = os.getenv(env_var)
            if val:
                asset_id = val
                break

    if not asset_id and organization_id:
        try:
            for asset_result in client.list_assets(
                parent=f"organizations/{organization_id}"
            ):
                asset_id = asset_result.asset.name.split("/")[-1]
                break
        except google.api_core.exceptions.GoogleAPICallError:
            pass

    if asset_id and "assets/" in asset_id:
        asset_id = asset_id.split("/")[-1]

    security_marks = securitycenter_v1p1beta1.SecurityMarks(
        name=f"organizations/{organization_id}/assets/{asset_id}/securityMarks",
        marks={"example_key": "example_value"},
    )
    update_mask = field_mask_pb2.FieldMask(paths=["marks"])

    if not organization_id or not asset_id:
        print("Organization ID and asset ID must be specified.")
    else:
        try:
            response = client.update_security_marks(
                security_marks=security_marks,
                update_mask=update_mask,
            )
            print(f"Updated security marks: {response.name}")
        except google.api_core.exceptions.GoogleAPICallError as error:
            print(f"API request failed: {error}")
# [END securitycenter_v1p1beta1_securitycenter_securitymarks_update]
