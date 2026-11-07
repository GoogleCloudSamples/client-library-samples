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

# [START artifactregistry_v1_artifactregistry_rule_update]
import google.api_core.exceptions
from google.cloud import artifactregistry_v1
from google.protobuf import field_mask_pb2

client = artifactregistry_v1.ArtifactRegistryClient()


def update_rule(
    project_id: str, location_id: str, repository_id: str, rule_id: str
) -> None:
    """Updates an existing rule in an Artifact Registry repository.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The regional location of the repository (for example, us-central1).
        repository_id: The ID of the Artifact Registry repository.
        rule_id: The ID of the rule to update.
    """
    rule_name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"repositories/{repository_id}/rules/{rule_id}"
    )

    rule = artifactregistry_v1.Rule(
        name=rule_name,
        action=artifactregistry_v1.Rule.Action.DENY,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["action"])

    request = artifactregistry_v1.UpdateRuleRequest(
        rule=rule,
        update_mask=update_mask,
    )

    try:
        response = client.update_rule(request=request)
        print(f"Updated rule: {response.name}")
        print(f"Action: {response.action.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update rule: {e.message}")
# [END artifactregistry_v1_artifactregistry_rule_update]
