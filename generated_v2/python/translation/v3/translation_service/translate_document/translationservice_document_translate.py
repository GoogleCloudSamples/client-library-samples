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

# [START translate_v3_translationservice_translate_document]
import google.api_core.exceptions
from google.cloud import translate_v3


def translate_document(
    project_id: str, location_id: str, target_language_code: str
) -> None:
    """Translates a document using Google Cloud Translation API.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global' or 'us-central1').
        target_language_code: The ISO-639 language code for translation (for example, 'es', 'fr', 'ja').
    """
    client = translate_v3.TranslationServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    # Minimal PDF document containing text for translation
    pdf_content = (
        b"%PDF-1.4\n"
        b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"
        b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"
        b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n"
        b"4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n"
        b"5 0 obj\n<< /Length 44 >>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(Hello world) Tj\nET\nendstream\nendobj\n"
        b"xref\n0 6\n"
        b"0000000000 65535 f \n"
        b"0000000009 00000 n \n"
        b"0000000058 00000 n \n"
        b"0000000115 00000 n \n"
        b"0000000242 00000 n \n"
        b"0000000310 00000 n \n"
        b"trailer\n<< /Size 6 /Root 1 0 R >>\n"
        b"startxref\n403\n%%EOF\n"
    )

    document_input_config = translate_v3.DocumentInputConfig(
        content=pdf_content,
        mime_type="application/pdf",
    )

    request = translate_v3.TranslateDocumentRequest(
        parent=parent,
        target_language_code=target_language_code,
        document_input_config=document_input_config,
    )

    try:
        response = client.translate_document(request=request)
        print(f"MIME type: {response.document_translation.mime_type}")
        print(
            f"Detected language: {response.document_translation.detected_language_code}"
        )
        print(
            f"Output count: {len(response.document_translation.byte_stream_outputs)}"
        )
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END translate_v3_translationservice_translate_document]
