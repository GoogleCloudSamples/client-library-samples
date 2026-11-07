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

# [START webrisk_v1beta1_webriskservicev1beta1_compute_threat_list_diff]
import os

from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
import google.auth
from google.cloud import webrisk_v1beta1


def compute_threat_list_diff() -> None:
    """Compute diffs for a Web Risk threat list."""
    _, project_id = google.auth.default()
    quota_project_id = (
        project_id
        or os.getenv("GOOGLE_CLOUD_PROJECT")
        or os.getenv("GCP_PROJECT")
    )
    client_options = (
        ClientOptions(quota_project_id=quota_project_id)
        if quota_project_id
        else None
    )
    client = webrisk_v1beta1.WebRiskServiceV1Beta1Client(
        client_options=client_options
    )

    threat_type = webrisk_v1beta1.ThreatType.MALWARE
    constraints = webrisk_v1beta1.ComputeThreatListDiffRequest.Constraints(
        max_diff_entries=1024,
        max_database_entries=2048,
        supported_compressions=[webrisk_v1beta1.CompressionType.RAW],
    )

    try:
        response = client.compute_threat_list_diff(
            threat_type=threat_type,
            constraints=constraints,
        )
        print(f"Response type: {response.response_type.name}")
        print(f"New version token: {response.new_version_token}")
    except (
        google.api_core.exceptions.PermissionDenied,
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.GoogleAPICallError,
    ) as e:
        print(f"API call failed: {e}")
# [END webrisk_v1beta1_webriskservicev1beta1_compute_threat_list_diff]
