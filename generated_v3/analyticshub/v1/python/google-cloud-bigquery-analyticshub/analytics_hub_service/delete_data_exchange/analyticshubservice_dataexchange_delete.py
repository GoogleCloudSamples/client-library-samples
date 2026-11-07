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

# [START analyticshub_v1_analyticshubservice_dataexchange_delete]
import google.api_core.exceptions
from google.cloud import bigquery_analyticshub_v1


def delete_data_exchange(
    project_id: str, location_id: str, data_exchange_id: str
) -> None:
    """Deletes a data exchange in Analytics Hub.

    Args:
        project_id: The Google Cloud project ID hosting the data exchange.
        location_id: The Google Cloud region or location of the data exchange
            (for example, 'us' or 'us-central1').
        data_exchange_id: The ID of the data exchange to delete.
    """
    client = bigquery_analyticshub_v1.AnalyticsHubServiceClient()

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"dataExchanges/{data_exchange_id}"
    )

    request = bigquery_analyticshub_v1.DeleteDataExchangeRequest(name=name)

    try:
        client.delete_data_exchange(request=request)
        print(f"Deleted data exchange: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete data exchange: {error}")
# [END analyticshub_v1_analyticshubservice_dataexchange_delete]
