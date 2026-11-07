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

# [START confidentialcomputing_verify_confidential_gke]
import google.api_core.exceptions
from google.cloud import confidentialcomputing_v1


def verify_confidential_gke(
    project_id: str, location_id: str, challenge_id: str
) -> None:
    """Verifies the attestation from a Confidential GKE node.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the Challenge was created (for example, 'us-central1').
        challenge_id: The server-generated UUID of the Challenge (for example, '11111111-2222-3333-4444-555555555555').
    """
    client = confidentialcomputing_v1.ConfidentialComputingClient()

    challenge = (
        f"projects/{project_id}/locations/{location_id}/challenges/{challenge_id}"
    )

    # For production environments, populate quotes, event log, and ak_cert from the node's vTPM.
    tpm_attestation = confidentialcomputing_v1.TpmAttestation(
        quotes=[
            confidentialcomputing_v1.TpmAttestation.Quote(
                hash_algo=1,
                raw_quote=b"example-quote-bytes",
                raw_signature=b"example-signature-bytes",
            )
        ],
        tcg_event_log=b"example-event-log-bytes",
        ak_cert=b"example-ak-cert-bytes",
    )

    request = confidentialcomputing_v1.VerifyConfidentialGkeRequest(
        challenge=challenge,
        tpm_attestation=tpm_attestation,
    )

    try:
        response = client.verify_confidential_gke(request=request)
        print("Confidential GKE verification succeeded.")
        print(f"Response: {response}")
    except google.api_core.exceptions.InvalidArgument as exc:
        print(f"Received expected validation response: {type(exc).__name__}")
# [END confidentialcomputing_verify_confidential_gke]
