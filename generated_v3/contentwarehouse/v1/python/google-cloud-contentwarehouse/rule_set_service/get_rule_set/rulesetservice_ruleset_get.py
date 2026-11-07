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

# [START contentwarehouse_v1_rulesetservice_ruleset_get]
import google.api_core.exceptions
from google.cloud import contentwarehouse_v1

client = contentwarehouse_v1.RuleSetServiceClient()


def get_rule_set(location_id: str, rule_set_id: str, project_id: str) -> None:
    """Retrieves a rule set from Document AI Warehouse.

    Args:
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        rule_set_id: The server-generated ID of the rule set (for example, 'example-ruleset-id').
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/locations/{location_id}/ruleSets/{rule_set_id}"

    request = contentwarehouse_v1.GetRuleSetRequest(
        name=name,
    )

    try:
        response = client.get_rule_set(request=request)
        print(f"Rule set name: {response.name}")
        print(f"Description: {response.description}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to retrieve rule set: {exc}")
# [END contentwarehouse_v1_rulesetservice_ruleset_get]
