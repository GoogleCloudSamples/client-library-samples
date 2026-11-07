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

# [START analyticshub_v1_analyticshubservice_dataexchanges_list]
import google.api_core.exceptions
from google.cloud import bigquery_analyticshub_v1


def list_data_exchanges(project_id: str, location_id: str) -> None:
    """Lists data exchanges in a specified project and location.

    Args:
        project_id: The Google Cloud project ID in which to list data exchanges.
        location_id: The Google Cloud region or multi-region where data exchanges
          are located.
    """
    client = bigquery_analyticshub_v1.AnalyticsHubServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    request = bigquery_analyticshub_v1.ListDataExchangesRequest(parent=parent)

    try:
        response = client.list_data_exchanges(request=request)
        for exchange in response:
            print(f"Name: {exchange.name}")
            print(f"Display name: {exchange.display_name}")
            print(f"Description: {exchange.description}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list data exchanges: {error}")


# [END analyticshub_v1_analyticshubservice_dataexchanges_list]
