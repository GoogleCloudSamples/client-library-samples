# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START monitoring_v3_create_alert_policy]
from google.api_core import exceptions
from google.cloud import monitoring_v3
from google.cloud.monitoring_v3 import AlertPolicy
from google.cloud.monitoring_v3.types import alert_service
from google.protobuf import duration_pb2, wrappers_pb2


def create_alert_policy_with_metric_threshold(
    project_id: str,
    notification_channel_id: str,
) -> None:
    """Creates a new alert policy that triggers when CPU utilization exceeds 90%.

    This sample demonstrates how to create a basic alert policy using a metric
    threshold condition. The policy will trigger if any GCE instance's CPU
    utilization goes above 90% for 5 minutes.

    Args:
        project_id: The Google Cloud project ID.
        notification_channel_id: The ID of an existing notification channel to
                                 associate with this alert policy.
    """
    client = monitoring_v3.AlertPolicyServiceClient()
    project_name = f"projects/{project_id}"

    condition = AlertPolicy.Condition()
    condition.display_name = "High CPU Utilization Threshold"
    condition.condition_threshold = AlertPolicy.Condition.MetricThreshold()
    condition.condition_threshold.filter = (
        'metric.type="compute.googleapis.com/instance/cpu/utilization" AND '
        'resource.type="gce_instance"'
    )
    condition.condition_threshold.comparison = (
        monitoring_v3.ComparisonType.COMPARISON_GT
    )
    condition.condition_threshold.threshold_value = 0.9
    condition.condition_threshold.duration = duration_pb2.Duration(seconds=300)  # 5 minutes,
    condition.condition_threshold.trigger = AlertPolicy.Condition.Trigger()
    condition.condition_threshold.trigger.count = 1

    alert_policy = AlertPolicy()
    alert_policy.display_name = "High CPU Utilization Alert Policy"
    alert_policy.combiner = "AND"
    alert_policy.conditions.append(condition)
    alert_policy.enabled = wrappers_pb2.BoolValue(value=True)

    alert_policy.notification_channels.append(
        f"projects/{project_id}/notificationChannels/{notification_channel_id}"
    )

    request = alert_service.CreateAlertPolicyRequest(
        name=project_name,
        alert_policy=alert_policy,
    )

    try:
        response = client.create_alert_policy(request=request)
        print(f"Successfully created alert policy: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(f"Conditions: {len(response.conditions)}")
        for cond in response.conditions:
            print(f"  - Condition Display Name: {cond.display_name}")
            if cond.condition_threshold:
                print(f"    Filter: {cond.condition_threshold.filter}")
                print(f"    Threshold: {cond.condition_threshold.threshold_value}")
        if response.notification_channels:
            print(f"Notification Channels: {', '.join(response.notification_channels)}")
    except exceptions.AlreadyExists as e:
        print(
            f"Error: An alert policy with display name '{alert_policy.display_name}' might already exist. {e}"
        )
        print("Consider using a unique display_name or updating an existing policy.")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Failed to create alert policy.")


# [END monitoring_v3_create_alert_policy]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new alert policy for high CPU utilization."
    )
    parser.add_argument(
        "--project_id",
        help="Your Google Cloud project ID.",
        required=True,
    )
    parser.add_argument(
        "--notification_channel_id",
        help="The ID of an existing notification channel.",
        required=True,
    )
    args = parser.parse_args()
    create_alert_policy_with_metric_threshold(
        project_id=args.project_id,
        notification_channel_id=args.notification_channel_id,
    )
