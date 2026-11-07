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

# [START dlp_v2_dlpservice_redact_image]
import struct
import zlib

import google.api_core.exceptions
from google.cloud import dlp_v2


def redact_image(project_id: str) -> None:
    """Redacts sensitive data from an image.

    Args:
        project_id: The Google Cloud project ID to use for the redaction request.
    """
    client = dlp_v2.DlpServiceClient()

    # Construct a valid 100x100 RGB PNG image in memory for demonstration.
    width, height = 100, 100
    raw_scanlines = b"".join(
        b"\x00" + b"\xff\xff\xff" * width for _ in range(height)
    )
    compressed_stream = zlib.compress(raw_scanlines)
    ihdr_payload = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    ihdr_checksum = struct.pack(">I", zlib.crc32(b"IHDR" + ihdr_payload))
    idat_checksum = struct.pack(">I", zlib.crc32(b"IDAT" + compressed_stream))
    iend_checksum = struct.pack(">I", zlib.crc32(b"IEND"))

    sample_png_bytes = (
        b"\x89PNG\r\n\x1a\n"
        + struct.pack(">I", len(ihdr_payload))
        + b"IHDR"
        + ihdr_payload
        + ihdr_checksum
        + struct.pack(">I", len(compressed_stream))
        + b"IDAT"
        + compressed_stream
        + idat_checksum
        + struct.pack(">I", 0)
        + b"IEND"
        + iend_checksum
    )

    byte_item = dlp_v2.ByteContentItem(
        type_=dlp_v2.ByteContentItem.BytesType.IMAGE_PNG,
        data=sample_png_bytes,
    )
    image_redaction_configs = [
        dlp_v2.RedactImageRequest.ImageRedactionConfig(
            info_type=dlp_v2.InfoType(name="EMAIL_ADDRESS")
        )
    ]
    inspect_config = dlp_v2.InspectConfig(
        info_types=[dlp_v2.InfoType(name="EMAIL_ADDRESS")],
        min_likelihood=dlp_v2.Likelihood.POSSIBLE,
    )

    parent = f"projects/{project_id}"
    request = dlp_v2.RedactImageRequest(
        parent=parent,
        byte_item=byte_item,
        image_redaction_configs=image_redaction_configs,
        inspect_config=inspect_config,
        include_findings=True,
    )

    try:
        response = client.redact_image(request=request)
        print(f"Redacted image size in bytes: {len(response.redacted_image)}")
        if response.inspect_result:
            print(
                f"Identified findings count: {len(response.inspect_result.findings)}"
            )
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error during image redaction: {error.message}")
# [END dlp_v2_dlpservice_redact_image]
