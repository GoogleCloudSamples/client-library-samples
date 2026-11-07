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

# [START discoveryengine_v1beta_groundedgenerationservice_check_grounding]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta

client = discoveryengine_v1beta.GroundedGenerationServiceClient()


def check_grounding(project_id: str) -> None:
    """Use the check_grounding method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    grounding_config = "default_grounding_config"
    grounding_config_path = (
        f"projects/{project_id}/locations/global/groundingConfigs/{grounding_config}"
    )

    facts = [
        discoveryengine_v1beta.GroundingFact(
            fact_text=(
                "Google Cloud provides scalable cloud computing services, "
                "including data analytics and machine learning tools."
            )
        )
    ]

    request = discoveryengine_v1beta.CheckGroundingRequest(
        grounding_config=grounding_config_path,
        answer_candidate=(
            "Google Cloud offers scalable computing, analytics, and machine"
            " learning services."
        ),
        facts=facts,
    )

    try:
        response = client.check_grounding(request=request)
        print(f"Support score: {response.support_score}")
        print(f"Cited chunks: {response.cited_chunks}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")


# [END discoveryengine_v1beta_groundedgenerationservice_check_grounding]
