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

# [START dataplex_v1_dataplexservice_zone_update]
import google.api_core.exceptions
from google.cloud import dataplex_v1
from google.protobuf import field_mask_pb2


def update_zone(zone: dataplex_v1.Zone) -> None:
    """Updates an existing Dataplex zone.

    Args:
        zone: The Dataplex Zone resource to update.
    """
    client = dataplex_v1.DataplexServiceClient()

    if isinstance(zone, str):
        zone = dataplex_v1.Zone(name=zone, description="Updated zone description")

    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_zone(
            zone=zone,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated zone: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
    except google.api_core.exceptions.RetryError as e:
        print(f"Retry limit exceeded: {e}")
# [END dataplex_v1_dataplexservice_zone_update]
