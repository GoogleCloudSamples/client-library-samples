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

# [START metastore_v1alpha_dataprocmetastorefederation_federations_list]
from google.api_core import exceptions
from google.cloud import metastore_v1alpha


def list_federations(location_id: str, project_id: str) -> None:
    """Lists Dataproc Metastore federations in a location.

    Args:
        location_id: The Google Cloud region where the service is located (for
            example, 'us-central1').
        project_id: The Google Cloud project ID.
    """
    client = metastore_v1alpha.DataprocMetastoreFederationClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = metastore_v1alpha.ListFederationsRequest(
        parent=parent,
    )

    try:
        response = client.list_federations(request=request)
        has_results = False
        for federation in response:
            has_results = True
            print(f"Federation name: {federation.name}")
            print(f"Endpoint URI: {federation.endpoint_uri}")
            print(f"State: {federation.state.name}")

        if not has_results:
            print(f"No federations found in {parent}.")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to list federations: {e.message}")
# [END metastore_v1alpha_dataprocmetastorefederation_federations_list]
