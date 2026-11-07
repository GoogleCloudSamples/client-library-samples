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

# [START webrisk_search_uris]
import os

from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
import google.auth
from google.cloud import webrisk_v1


def search_uris() -> None:
    """Searches whether a URI poses a threat such as malware or social engineering."""
    # Set quota_project_id to attribute the request to the active project.
    project_id = (
        os.environ.get("GOOGLE_CLOUD_PROJECT")
        or os.environ.get("GCP_PROJECT")
        or os.environ.get("GCLOUD_PROJECT")
    )
    if not project_id:
        _, project_id = google.auth.default()

    client_options = (
        ClientOptions(quota_project_id=project_id) if project_id else None
    )
    client = webrisk_v1.WebRiskServiceClient(client_options=client_options)

    uri = "https://example.com"
    threat_types = [
        webrisk_v1.ThreatType.MALWARE,
        webrisk_v1.ThreatType.SOCIAL_ENGINEERING,
    ]

    request = webrisk_v1.SearchUrisRequest(
        uri=uri,
        threat_types=threat_types,
    )

    try:
        response = client.search_uris(request=request)
        if response.threat.threat_types:
            print(f"Threat detected: {response.threat.threat_types}")
            print(f"Expire time: {response.threat.expire_time}")
        else:
            print("No threats detected.")
    except google.api_core.exceptions.PermissionDenied as error:
        print(f"Permission denied: {error}")
    except google.api_core.exceptions.InvalidArgument as error:
        print(f"Invalid argument: {error}")


# [END webrisk_search_uris]
