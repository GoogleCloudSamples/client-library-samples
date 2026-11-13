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

# [START monitoring_v3_alertpolicyservice_alertpolicy_create]
import google.api_core.exceptions
from google.cloud import monitoring_v3


def create_alert_policy(project_id: str) -> None:
    """Creates an alert policy in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID where the alert policy is created.
    """
    client = monitoring_v3.AlertPolicyServiceClient()
    name = f"projects/{project_id}"

    # Build metric threshold condition required for alert policy creation
    aggregation = monitoring_v3.Aggregation(
        alignment_period={"seconds": 60},
        per_series_aligner=monitoring_v3.Aggregation.Aligner.ALIGN_MEAN,
    )
    condition_threshold = monitoring_v3.AlertPolicy.Condition.MetricThreshold(
        filter='metric.type="compute.googleapis.com/instance/cpu/utilization" AND resource.type="gce_instance"',
        comparison=monitoring_v3.ComparisonType.COMPARISON_GT,
        threshold_value=0.8,
        duration={"seconds": 60},
        aggregations=[aggregation],
    )
    condition = monitoring_v3.AlertPolicy.Condition(
        display_name="CPU utilization exceeds threshold",
        condition_threshold=condition_threshold,
    )

    alert_policy = monitoring_v3.AlertPolicy(
        display_name="High CPU Usage Alert",
        combiner=monitoring_v3.AlertPolicy.ConditionCombinerType.AND,
        conditions=[condition],
    )

    try:
        response = client.create_alert_policy(
            name=name,
            alert_policy=alert_policy,
        )
        print(f"Created alert policy: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create alert policy: {error}")
# [END monitoring_v3_alertpolicyservice_alertpolicy_create]
