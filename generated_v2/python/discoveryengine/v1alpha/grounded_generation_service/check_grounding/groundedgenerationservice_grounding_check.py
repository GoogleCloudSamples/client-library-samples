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

# [START discoveryengine_v1alpha_groundedgenerationservice_check_grounding]
from google.api_core import exceptions
from google.cloud import discoveryengine_v1alpha


def check_grounding(project_id: str) -> None:
    """Checks grounding for candidate text against provided facts.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = discoveryengine_v1alpha.GroundedGenerationServiceClient()

    grounding_config = (
        f"projects/{project_id}/locations/global/groundingConfigs/default_grounding_config"
    )

    facts = [
        discoveryengine_v1alpha.GroundingFact(
            fact_text="Paris is the capital and most populous city of France."
        )
    ]

    request = discoveryengine_v1alpha.CheckGroundingRequest(
        grounding_config=grounding_config,
        answer_candidate="Paris is the capital of France.",
        facts=facts,
    )

    try:
        response = client.check_grounding(request=request)
        print(f"Grounding check response: {response}")
    except exceptions.GoogleAPIError as exc:
        print(f"Check grounding request failed: {exc}")


# [END discoveryengine_v1alpha_groundedgenerationservice_check_grounding]
