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

# [START analyticshub_v1beta1_analyticshubservice_dataexchange_update]
import google.api_core.exceptions
from google.protobuf import field_mask_pb2

try:
    from google.cloud import bigquery_analyticshub_v1beta1 as analyticshub_v1beta1
except ImportError:
    try:
        from google.cloud import bigquery_data_exchange_v1beta1 as analyticshub_v1beta1
    except ImportError:
        try:
            from google.cloud import bigquery_dataexchange_v1beta1 as analyticshub_v1beta1
        except ImportError:
            try:
                from google.cloud import analyticshub_v1beta1
            except ImportError:
                try:
                    from google.cloud import bigquery_analyticshub as analyticshub_v1beta1
                except ImportError:
                    from google.cloud import bigquery_analyticshub_v1 as analyticshub_v1beta1


def update_data_exchange(
    project_id: str, location_id: str, data_exchange_id: str
) -> None:
    """Updates an existing data exchange in Analytics Hub.

    Args:
        project_id: The Google Cloud project ID hosting the data exchange.
        location_id: The geographic location or region of the data exchange
            (for example, 'us' or 'us-central1').
        data_exchange_id: The identifier of the existing data exchange to
            update.
    """
    client = analyticshub_v1beta1.AnalyticsHubServiceClient()

    data_exchange_name = client.data_exchange_path(
        project_id, location_id, data_exchange_id
    )

    update_mask = field_mask_pb2.FieldMask(paths=["description"])
    data_exchange = analyticshub_v1beta1.DataExchange(
        name=data_exchange_name,
        description="Updated description for the data exchange",
    )

    try:
        response = client.update_data_exchange(
            data_exchange=data_exchange,
            update_mask=update_mask,
        )
        print(f"Updated data exchange: {response.name}")
        print(f"New description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to update data exchange: {exc}")
# [END analyticshub_v1beta1_analyticshubservice_dataexchange_update]
