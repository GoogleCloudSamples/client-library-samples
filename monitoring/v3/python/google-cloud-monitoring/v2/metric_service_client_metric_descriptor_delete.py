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

# [START monitoring_v3_metricservice_metricdescriptor_delete]
from google.api_core.exceptions import NotFound
from google.cloud import monitoring_v3


def delete_metric_descriptor(
    project_id: str,
    metric_id: str,
) -> None:
    """
    Deletes a user-defined custom metric descriptor.

    Args:
        project_id: The Google Cloud project ID.
        metric_id: The ID of the metric descriptor to delete.
    """
    client = monitoring_v3.MetricServiceClient()
    metric_descriptor_name = client.metric_descriptor_path(project_id, metric_id)

    try:
        client.delete_metric_descriptor(name=metric_descriptor_name)
        print(f"Successfully deleted metric descriptor: {metric_descriptor_name}")
    except NotFound:
        print(
            f"Metric descriptor {metric_descriptor_name} not found. "
            "It might have already been deleted or never existed. "
            "Please ensure the metric_id is correct and refers to an existing custom metric."
        )
    except Exception as e:
        print(
            f"An error occurred while deleting metric descriptor {metric_descriptor_name}: {e}"
        )


# [END monitoring_v3_metricservice_metricdescriptor_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a custom metric descriptor.")
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--metric_id",
        required=True,
        help="The ID of the metric descriptor to delete.",
    )
    args = parser.parse_args()
    delete_metric_descriptor(project_id=args.project_id, metric_id=args.metric_id)
