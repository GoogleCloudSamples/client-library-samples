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

# [START oracledatabase_v1_oracledatabase_minorversions_list]
from google.api_core import exceptions
from google.cloud import oracledatabase_v1


def list_minor_versions(
    project_id: str, location_id: str, gi_version_id: str
) -> None:
    """Lists available Oracle Grid Infrastructure minor versions.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
        gi_version_id: The server-defined ID of the Oracle Grid Infrastructure
          (GI) version (for example, '19'). Obtain this value from a
          ListGiVersions response.
    """
    client = oracledatabase_v1.OracleDatabaseClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/giVersions/{gi_version_id}"
    )

    request = oracledatabase_v1.ListMinorVersionsRequest(parent=parent)

    try:
        response = client.list_minor_versions(request=request)
        for minor_version in response:
            print(f"Minor version: {minor_version.version}")
            print(f"Resource name: {minor_version.name}")
    except exceptions.BadRequest as ex:
        if "ENTITLEMENT_NOT_FOUND" in str(ex):
            print(
                "Listing minor versions requires an active marketplace order on the"
                " billing account."
            )
        else:
            print(f"Request invalid: {ex}")
    except exceptions.NotFound as ex:
        print(f"Resource not found: {ex}")
    except exceptions.PermissionDenied as ex:
        print(f"Permission denied: {ex}")
# [END oracledatabase_v1_oracledatabase_minorversions_list]
