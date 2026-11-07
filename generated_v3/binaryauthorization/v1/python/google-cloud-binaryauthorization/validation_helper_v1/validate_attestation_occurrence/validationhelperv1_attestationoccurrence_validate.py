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

# [START binaryauthorization_v1_validationhelperv1_validate_attestation_occurrence]
import google.api_core.exceptions
from google.cloud import binaryauthorization_v1
from grafeas import grafeas_v1

client = binaryauthorization_v1.ValidationHelperV1Client()


def validate_attestation_occurrence(project_id: str, attestor_id: str) -> None:
    """Validate an attestation occurrence against an existing attestor.

    Args:
        project_id: The Google Cloud project ID.
        attestor_id: The ID of the Binary Authorization attestor.
    """
    attestor = f"projects/{project_id}/attestors/{attestor_id}"
    attestation = grafeas_v1.AttestationOccurrence(
        serialized_payload=b"example-serialized-payload",
        signatures=[
            grafeas_v1.Signature(
                public_key_id="example-public-key-id",
                signature=b"example-signature-bytes",
            )
        ],
    )
    occurrence_resource_uri = (
        "gcr.io/example-project/example-image@sha256:"
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    )
    occurrence_note = f"projects/{project_id}/notes/example-note"

    request = binaryauthorization_v1.ValidateAttestationOccurrenceRequest(
        attestor=attestor,
        attestation=attestation,
        occurrence_resource_uri=occurrence_resource_uri,
        occurrence_note=occurrence_note,
    )

    try:
        response = client.validate_attestation_occurrence(request=request)
        print(f"Validation result: {response.result.name}")
        if response.denial_reason:
            print(f"Denial reason: {response.denial_reason}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Validation failed with API error: {e}")


# [END binaryauthorization_v1_validationhelperv1_validate_attestation_occurrence]
