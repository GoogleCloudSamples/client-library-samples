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

# [START discoveryengine_v1_groundedgenerationservice_check_grounding]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1

client = discoveryengine_v1.GroundedGenerationServiceClient()


def check_grounding(project_id: str) -> None:
    """Verifies that a candidate answer is grounded in factual statements.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    grounding_config = (
        f"projects/{project_id}/locations/global/groundingConfigs/default_grounding_config"
    )

    facts = [
        discoveryengine_v1.GroundingFact(
            fact_text=(
                "Google Cloud provides computing infrastructure, data analytics, "
                "and machine learning capabilities."
            )
        )
    ]

    request = discoveryengine_v1.CheckGroundingRequest(
        grounding_config=grounding_config,
        answer_candidate="Google Cloud provides machine learning capabilities.",
        facts=facts,
    )

    try:
        response = client.check_grounding(request=request)
        print(f"Grounding support score: {response.support_score}")
        print(f"Cited chunks count: {len(response.cited_chunks)}")
    except google.api_core.exceptions.GoogleAPICallError as err:
        print(f"Request failed: {err}")
# [END discoveryengine_v1_groundedgenerationservice_check_grounding]
