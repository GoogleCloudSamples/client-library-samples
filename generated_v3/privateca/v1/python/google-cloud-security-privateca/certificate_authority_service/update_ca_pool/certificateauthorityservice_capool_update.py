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

# [START privateca_v1_certificateauthorityservice_capool_update]
from google.api_core import exceptions
from google.cloud.security import privateca_v1
from google.protobuf import field_mask_pb2


def update_ca_pool(project_id: str, location_id: str, ca_pool_id: str) -> None:
    """Updates an existing CA pool.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location or region of the CA pool (for example, 'us-central1').
        ca_pool_id: The user-provided ID of the CA pool to update.
    """
    client = privateca_v1.CertificateAuthorityServiceClient()

    update_mask = field_mask_pb2.FieldMask(paths=["labels"])
    ca_pool = privateca_v1.CaPool(
        name=f"projects/{project_id}/locations/{location_id}/caPools/{ca_pool_id}",
        labels={"env": "test"},
    )

    try:
        operation = client.update_ca_pool(
            ca_pool=ca_pool,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated CA pool: {response.name}")
    except exceptions.GoogleAPICallError as e:
        print(f"Failed to update CA pool: {e}")
# [END privateca_v1_certificateauthorityservice_capool_update]
