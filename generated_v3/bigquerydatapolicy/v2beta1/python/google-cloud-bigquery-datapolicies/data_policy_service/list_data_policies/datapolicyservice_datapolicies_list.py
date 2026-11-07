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

# [START analyticshub_v2beta1_datapolicyservice_datapolicies_list]
import os

import google.api_core.exceptions
import google.auth
import google.auth.exceptions
from google.cloud import bigquery_datapolicies_v1


def list_data_policies(location_id: str) -> None:
    """Lists data policies in a location.

    Args:
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
    """
    project_number = (
        os.environ.get("GOOGLE_CLOUD_PROJECT_NUMBER")
        or os.environ.get("GOOGLE_CLOUD_PROJECT")
    )
    if not project_number:
        try:
            _, project_number = google.auth.default()
        except google.auth.exceptions.DefaultCredentialsError:
            project_number = None
    project_number = project_number or "example-project-number"

    parent = f"projects/{project_number}/locations/{location_id}"

    client = bigquery_datapolicies_v1.DataPolicyServiceClient()
    request = bigquery_datapolicies_v1.ListDataPoliciesRequest(parent=parent)

    try:
        page_result = client.list_data_policies(request=request)
        for data_policy in page_result:
            print(f"Data policy name: {data_policy.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list data policies: {error}")
# [END analyticshub_v2beta1_datapolicyservice_datapolicies_list]
