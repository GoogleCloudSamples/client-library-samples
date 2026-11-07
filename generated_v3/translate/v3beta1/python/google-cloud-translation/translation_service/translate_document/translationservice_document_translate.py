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

# [START translate_v3beta1_translationservice_translate_document]
import google.api_core.exceptions
from google.cloud import translate_v3beta1

client = translate_v3beta1.TranslationServiceClient()


def translate_document(project_id: str, location_id: str) -> None:
    """Translates a document using the Cloud Translation API.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location (region) ID, such as 'us-central1' or 'global'.
    """
    target_language_code = "fr"

    # Construct a valid minimal PDF containing text for translation.
    pdf_header = b"%PDF-1.4\n"
    pdf_body = [
        b"1 0 obj\n<</Type /Catalog /Pages 2 0 R>>\nendobj\n",
        b"2 0 obj\n<</Type /Pages /Kids [3 0 R] /Count 1>>\nendobj\n",
        b"3 0 obj\n<</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] "
        b"/Contents 4 0 R /Resources <</Font <</F1 5 0 R>>>>>>\nendobj\n",
        b"4 0 obj\n<</Length 46>>\nstream\nBT\n/F1 12 Tf\n100 700 Td\n"
        b"(Hello, world!) Tj\nET\nendstream\nendobj\n",
        b"5 0 obj\n<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>\nendobj\n",
    ]
    offsets = []
    current_offset = len(pdf_header)
    for obj in pdf_body:
        offsets.append(current_offset)
        current_offset += len(obj)

    xref_entries = [b"0000000000 65535 f \n"] + [
        f"{offset:010d} 00000 n \n".encode("ascii") for offset in offsets
    ]
    xref = f"xref\n0 {len(xref_entries)}\n".encode("ascii") + b"".join(xref_entries)
    trailer = (
        f"trailer\n<</Size {len(xref_entries)} /Root 1 0 R>>\n"
        f"startxref\n{current_offset}\n%%EOF\n"
    ).encode("ascii")
    sample_pdf = pdf_header + b"".join(pdf_body) + xref + trailer

    document_input_config = translate_v3beta1.DocumentInputConfig(
        content=sample_pdf,
        mime_type="application/pdf",
    )
    parent = f"projects/{project_id}/locations/{location_id}"

    request = translate_v3beta1.TranslateDocumentRequest(
        parent=parent,
        target_language_code=target_language_code,
        document_input_config=document_input_config,
    )

    try:
        response = client.translate_document(request=request)
        print(f"Translated document MIME type: {response.document_translation.mime_type}")
        print(f"Detected language code: {response.document_translation.detected_language_code}")
        total_bytes = sum(len(chunk) for chunk in response.document_translation.byte_stream_outputs)
        print(f"Translated document size in bytes: {total_bytes}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Document translation failed: {e.message}")
# [END translate_v3beta1_translationservice_translate_document]
