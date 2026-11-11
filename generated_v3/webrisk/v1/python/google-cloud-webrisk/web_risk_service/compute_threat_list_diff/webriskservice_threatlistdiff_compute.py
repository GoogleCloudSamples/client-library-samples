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

# [START webrisk_compute_threat_list_diff]
import os

import google.api_core.exceptions
from google.api_core.client_options import ClientOptions
import google.auth
from google.cloud import webrisk_v1


def compute_threat_list_diff() -> None:
    """Compute threat list diff for malware threats."""
    project_id = os.getenv("GOOGLE_CLOUD_PROJECT") or os.getenv("GCLOUD_PROJECT")
    if not project_id:
        try:
            _, project_id = google.auth.default()
        except google.auth.exceptions.DefaultCredentialsError:
            project_id = None

    client_options = ClientOptions(quota_project_id=project_id) if project_id else None
    client = webrisk_v1.WebRiskServiceClient(client_options=client_options)

    threat_type = webrisk_v1.ThreatType.MALWARE
    constraints = webrisk_v1.ComputeThreatListDiffRequest.Constraints(
        supported_compressions=[webrisk_v1.CompressionType.RAW]
    )

    try:
        response = client.compute_threat_list_diff(
            threat_type=threat_type,
            constraints=constraints,
        )
        print(f"Response type: {response.response_type.name}")
        print(f"New version token: {response.new_version_token}")
    except google.api_core.exceptions.PermissionDenied as error:
        print(f"Permission denied: {error}")
    except google.api_core.exceptions.InvalidArgument as error:
        print(f"Invalid argument: {error}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END webrisk_compute_threat_list_diff]
