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

# [START analyticshub_v1beta1_analyticshubservice_dataexchange_create]
import google.api_core.exceptions
from google.cloud import bigquery_data_exchange_v1beta1


def create_data_exchange(
    data_exchange_id: str, project_id: str, location_id: str
) -> None:
    """Creates a data exchange in Analytics Hub.

    Args:
        data_exchange_id: Unique identifier for the new data exchange (for example, 'example_data_exchange').
        project_id: Google Cloud project ID where the data exchange is hosted.
        location_id: Geographic location of the data exchange (for example, 'us' or 'us-central1').
    """
    client = bigquery_data_exchange_v1beta1.AnalyticsHubServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    data_exchange = bigquery_data_exchange_v1beta1.DataExchange(
        display_name="Sample Data Exchange",
        description="Data exchange for sharing analytics datasets.",
    )

    request = bigquery_data_exchange_v1beta1.CreateDataExchangeRequest(
        parent=parent,
        data_exchange_id=data_exchange_id,
        data_exchange=data_exchange,
    )

    try:
        response = client.create_data_exchange(request=request)
        print(f"Created data exchange: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create data exchange: {e}")
# [END analyticshub_v1beta1_analyticshubservice_dataexchange_create]
