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

# [START dlp_v2_dlpservice_reidentify_content]
import google.api_core.exceptions
from google.cloud import dlp_v2

client = dlp_v2.DlpServiceClient()


def reidentify_content(project_id: str) -> None:
    """Use the reidentify_content method

    Args:
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}"

    # Configure the surrogate info type used during de-identification
    surrogate_info_type = dlp_v2.InfoType(name="EMAIL_TOKEN")
    inspect_config = dlp_v2.InspectConfig(
        custom_info_types=[
            dlp_v2.CustomInfoType(
                info_type=surrogate_info_type,
                surrogate_type=dlp_v2.CustomInfoType.SurrogateType(),
            )
        ]
    )

    # Configure the deterministic decryption parameters
    crypto_key = dlp_v2.CryptoKey(
        unwrapped=dlp_v2.UnwrappedCryptoKey(
            key=b"example-key-32-bytes-length-1234"
        )
    )
    crypto_deterministic_config = dlp_v2.CryptoDeterministicConfig(
        crypto_key=crypto_key,
        surrogate_info_type=surrogate_info_type,
    )
    primitive_transformation = dlp_v2.PrimitiveTransformation(
        crypto_deterministic_config=crypto_deterministic_config
    )
    transformation = dlp_v2.InfoTypeTransformations.InfoTypeTransformation(
        primitive_transformation=primitive_transformation
    )
    reidentify_config = dlp_v2.DeidentifyConfig(
        info_type_transformations=dlp_v2.InfoTypeTransformations(
            transformations=[transformation]
        )
    )

    # Encrypted token data to be re-identified
    item = dlp_v2.ContentItem(value="EMAIL_TOKEN(52):AY2x9yL7v0n0zD1Q==")

    request = dlp_v2.ReidentifyContentRequest(
        parent=parent,
        reidentify_config=reidentify_config,
        inspect_config=inspect_config,
        item=item,
    )

    try:
        response = client.reidentify_content(request=request)
        print(f"Re-identified content: {response.item.value}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to re-identify content: {exc}")
# [END dlp_v2_dlpservice_reidentify_content]
