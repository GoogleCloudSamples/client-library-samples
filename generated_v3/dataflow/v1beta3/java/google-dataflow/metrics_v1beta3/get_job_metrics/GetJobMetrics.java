// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.cloud.dataflow.v1beta3;

// [START dataflow_v1beta3_metricsv1beta3_jobmetrics_get]
import com.google.dataflow.v1beta3.GetJobMetricsRequest;
import com.google.dataflow.v1beta3.JobMetrics;
import com.google.dataflow.v1beta3.MetricUpdate;
import com.google.dataflow.v1beta3.MetricsV1Beta3Client;
import java.io.IOException;

public class GetJobMetrics {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String jobId = "example-job-id";
    getJobMetrics(projectId, locationId, jobId);
  }

  public static void getJobMetrics(String projectId, String locationId, String jobId)
      throws IOException {
    try (MetricsV1Beta3Client client = MetricsV1Beta3Client.create()) {
      GetJobMetricsRequest request =
          GetJobMetricsRequest.newBuilder()
              .setProjectId(projectId)
              .setLocation(locationId)
              .setJobId(jobId)
              .build();

      JobMetrics response = client.getJobMetrics(request);
      System.out.printf("Retrieved %d metrics for job %s.%n", response.getMetricsCount(), jobId);
      for (MetricUpdate metric : response.getMetricsList()) {
        System.out.printf("Metric name: %s%n", metric.getName().getName());
      }
    }
  }
}
// [END dataflow_v1beta3_metricsv1beta3_jobmetrics_get]
