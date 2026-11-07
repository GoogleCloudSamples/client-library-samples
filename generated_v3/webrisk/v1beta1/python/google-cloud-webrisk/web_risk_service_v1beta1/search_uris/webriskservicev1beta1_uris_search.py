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

# [START webrisk_v1beta1_webriskservicev1beta1_uris_search]
import google.api_core.exceptions
from google.cloud import webrisk_v1beta1

client = webrisk_v1beta1.WebRiskServiceV1Beta1Client()


def search_uris(uri: str) -> None:
    """Use the search_uris method

    Args:
        uri: The URI to be checked for matches.
    """
    threat_types = [
        webrisk_v1beta1.ThreatType.MALWARE,
        webrisk_v1beta1.ThreatType.SOCIAL_ENGINEERING,
    ]

    try:
        response = client.search_uris(uri=uri, threat_types=threat_types)
        if response.threat and response.threat.threat_types:
            print(f"Threat detected: {response.threat.threat_types}")
        else:
            print("No threats detected.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END webrisk_v1beta1_webriskservicev1beta1_uris_search]
