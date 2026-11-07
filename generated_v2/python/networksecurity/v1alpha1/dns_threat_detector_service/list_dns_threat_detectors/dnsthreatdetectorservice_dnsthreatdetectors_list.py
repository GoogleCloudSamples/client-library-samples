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

# [START networksecurity_v1alpha1_dnsthreatdetectorservice_dnsthreatdetectors_list]
import google.api_core.exceptions
from google.cloud import network_security_v1alpha1


def list_dns_threat_detectors(project_id: str, location_id: str) -> None:
    """Lists DNS threat detectors in a specified project and location.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID (for example, 'global').
    """
    client = network_security_v1alpha1.DnsThreatDetectorServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = network_security_v1alpha1.ListDnsThreatDetectorsRequest(
        parent=parent,
    )

    try:
        response = client.list_dns_threat_detectors(request=request)
        for detector in response:
            print(f"Detector name: {detector.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list DNS threat detectors: {error}")
# [END networksecurity_v1alpha1_dnsthreatdetectorservice_dnsthreatdetectors_list]
