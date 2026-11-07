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

# [START dataform_v1beta1_dataform_config_update]
import google.api_core.exceptions
from google.cloud import dataform_v1beta1
from google.protobuf import field_mask_pb2

client = dataform_v1beta1.DataformClient()


def update_config(
    project_id: str, location_id: str, default_kms_key_name: str
) -> None:
    """Updates the Dataform location configuration.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Dataform location ID.
        default_kms_key_name: The resource name of the Cloud KMS CryptoKey to
          use as the default encryption key in the format
          projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}.
    """
    config = dataform_v1beta1.Config(
        name=f"projects/{project_id}/locations/{location_id}/config",
        default_kms_key_name=default_kms_key_name,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["default_kms_key_name"])

    try:
        response = client.update_config(
            config=config,
            update_mask=update_mask,
        )
        print(f"Updated configuration: {response.name}")
        print(f"Default Cloud KMS key: {response.default_kms_key_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END dataform_v1beta1_dataform_config_update]
