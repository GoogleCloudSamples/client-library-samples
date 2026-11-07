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

# [START webrisk_v1beta1_webriskservicev1beta1_hashes_search]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
import google.auth
from google.cloud import webrisk_v1beta1


def search_hashes() -> None:
    """Search for full hashes matching the specified hash prefix."""
    # Obtain Application Default Credentials and quota project ID.
    _, project_id = google.auth.default()
    client_options = (
        ClientOptions(quota_project_id=project_id) if project_id else None
    )
    client = webrisk_v1beta1.WebRiskServiceV1Beta1Client(
        client_options=client_options
    )

    threat_types = [webrisk_v1beta1.ThreatType.MALWARE]
    hash_prefix = b"example-hash-prefix"

    request = webrisk_v1beta1.SearchHashesRequest(
        hash_prefix=hash_prefix,
        threat_types=threat_types,
    )

    try:
        response = client.search_hashes(request=request)
        print(f"Negative expire time: {response.negative_expire_time}")
        for threat in response.threats:
            print(f"Threat hash: {threat.hash}")
    except google.api_core.exceptions.PermissionDenied as exc:
        print(f"Access denied: {exc.message}")
    except google.api_core.exceptions.InvalidArgument as exc:
        print(f"Invalid argument: {exc.message}")
# [END webrisk_v1beta1_webriskservicev1beta1_hashes_search]
