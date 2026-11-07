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

# [START analyticshub_v1_analyticshubservice_dataexchange_update]
import google.api_core.exceptions
from google.cloud import bigquery_analyticshub_v1
from google.protobuf import field_mask_pb2


def update_data_exchange(
    project_id: str, location_id: str, data_exchange_id: str
) -> None:
    """Updates an existing data exchange.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The geographic location of the data exchange.
        data_exchange_id: The identifier of the data exchange to update.
    """
    client = bigquery_analyticshub_v1.AnalyticsHubServiceClient()

    update_mask = field_mask_pb2.FieldMask(paths=["description"])
    data_exchange = bigquery_analyticshub_v1.DataExchange(
        name=f"projects/{project_id}/locations/{location_id}/dataExchanges/{data_exchange_id}",
        description="Updated data exchange description.",
    )

    try:
        response = client.update_data_exchange(
            request=bigquery_analyticshub_v1.UpdateDataExchangeRequest(
                data_exchange=data_exchange,
                update_mask=update_mask,
            )
        )
        print(f"Updated data exchange: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END analyticshub_v1_analyticshubservice_dataexchange_update]
