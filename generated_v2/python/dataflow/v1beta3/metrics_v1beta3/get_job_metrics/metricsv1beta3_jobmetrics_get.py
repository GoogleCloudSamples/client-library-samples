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

# [START dataflow_v1beta3_metricsv1beta3_jobmetrics_get]
import google.api_core.exceptions
from google.cloud import dataflow_v1beta3

client = dataflow_v1beta3.MetricsV1Beta3Client()


def get_job_metrics(project_id: str, location_id: str, job_id: str) -> None:
    """Retrieves metric information for a specified Cloud Dataflow job.

    Args:
        project_id: The Google Cloud project ID hosting the Dataflow job.
        location_id: The Dataflow regional endpoint location (for example, 'us-central1').
        job_id: The server-generated Dataflow job ID.
    """
    request = dataflow_v1beta3.GetJobMetricsRequest(
        project_id=project_id,
        location=location_id,
        job_id=job_id,
    )

    try:
        response = client.get_job_metrics(request=request)
        print(f"Retrieved metrics for job: {job_id}")
        print(f"Metrics count: {len(response.metrics)}")
        for metric in response.metrics:
            metric_name = metric.name.name if metric.name else "Unnamed metric"
            print(f" - Metric name: {metric_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END dataflow_v1beta3_metricsv1beta3_jobmetrics_get]
