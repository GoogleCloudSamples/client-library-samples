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

# [START networksecurity_v1beta1_dnsthreatdetectorservice_dnsthreatdetectors_list]
from google.api_core import exceptions
from google.cloud import network_security_v1beta1


def list_dns_threat_detectors(project_id: str, location_id: str) -> None:
    """Lists DNS threat detectors in a specified location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Cloud location ID (for example, 'global').
    """
    client = network_security_v1beta1.DnsThreatDetectorServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    try:
        request = network_security_v1beta1.ListDnsThreatDetectorsRequest(
            parent=parent,
        )
        page_result = client.list_dns_threat_detectors(request=request)

        for dns_threat_detector in page_result:
            print(f"Name: {dns_threat_detector.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error}")
# [END networksecurity_v1beta1_dnsthreatdetectorservice_dnsthreatdetectors_list]
