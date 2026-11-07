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

# [START contactcenterinsights_v1_contactcenterinsights_analysisrule_get]
import google.api_core.exceptions

try:
    from google.cloud import contactcenterinsights_v1
except ImportError:
    try:
        import google.cloud.contactcenterinsights_v1 as contactcenterinsights_v1
    except ImportError:
        try:
            from google.cloud import contactcenterinsights as contactcenterinsights_v1
        except ImportError:
            try:
                from google.cloud import (
                    contact_center_insights_v1 as contactcenterinsights_v1,
                )
            except ImportError:
                from google.cloud import (
                    contact_center_insights as contactcenterinsights_v1,
                )


def get_analysis_rule(
    project_id: str, location_id: str, analysis_rule_id: str
) -> None:
    """Retrieves an analysis rule from Contact Center Insights.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID.
        analysis_rule_id: The server-generated ID of the analysis rule.
    """
    client = contactcenterinsights_v1.ContactCenterInsightsClient()

    name = f"projects/{project_id}/locations/{location_id}/analysisRules/{analysis_rule_id}"
    request = contactcenterinsights_v1.GetAnalysisRuleRequest(name=name)

    try:
        response = client.get_analysis_rule(request=request)
        print(f"Retrieved analysis rule: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END contactcenterinsights_v1_contactcenterinsights_analysisrule_get]
