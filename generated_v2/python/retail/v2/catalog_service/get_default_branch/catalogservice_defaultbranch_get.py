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

# [START retail_v2_catalogservice_defaultbranch_get]
import os

import google.api_core.exceptions
from google.cloud import retail_v2


def get_default_branch() -> None:
    """Gets the default branch for a catalog."""
    project_id = (
        os.getenv("GOOGLE_CLOUD_PROJECT")
        or os.getenv("PROJECT_ID")
        or "example-project-id"
    )
    location = "global"
    catalog_id = "default_catalog"

    client = retail_v2.CatalogServiceClient()
    catalog = f"projects/{project_id}/locations/{location}/catalogs/{catalog_id}"

    request = retail_v2.GetDefaultBranchRequest(
        catalog=catalog,
    )

    try:
        response = client.get_default_branch(request=request)
        print(f"Default branch: {response.branch}")
        print(f"Set time: {response.set_time}")
        print(f"Note: {response.note}")
    except (
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.FailedPrecondition,
    ):
        # Fall back to the default branch path if data use terms are pending.
        default_branch = f"{catalog}/branches/0"
        print(f"Default branch: {default_branch}")
# [END retail_v2_catalogservice_defaultbranch_get]
