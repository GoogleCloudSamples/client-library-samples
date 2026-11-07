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

package com.google.cloud.monitoring.v3;

// [START monitoring_v3_metricservice_servicetimeseries_create]
import com.google.api.Metric;
import com.google.api.MetricDescriptor.MetricKind;
import com.google.api.MetricDescriptor.ValueType;
import com.google.api.MonitoredResource;
import com.google.monitoring.v3.Point;
import com.google.monitoring.v3.TimeInterval;
import com.google.monitoring.v3.TimeSeries;
import com.google.monitoring.v3.TypedValue;
import com.google.protobuf.Timestamp;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class CreateServiceTimeSeries {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    createServiceTimeSeries(projectId);
  }

  public static void createServiceTimeSeries(String projectId) throws IOException {
    try (MetricServiceClient client = MetricServiceClient.create()) {
      String name = "projects/" + projectId;

      long currentTimeSeconds = System.currentTimeMillis() / 1000;
      Timestamp endTime = Timestamp.newBuilder().setSeconds(currentTimeSeconds).build();
      Timestamp startTime = Timestamp.newBuilder().setSeconds(currentTimeSeconds - 60).build();

      TimeInterval interval =
          TimeInterval.newBuilder().setStartTime(startTime).setEndTime(endTime).build();

      TypedValue value = TypedValue.newBuilder().setInt64Value(123L).build();

      Point point = Point.newBuilder().setInterval(interval).setValue(value).build();

      Metric metric =
          Metric.newBuilder()
              .setType("istio.io/service/server/request_count")
              .putLabels("response_code", "200")
              .build();

      // Service metrics such as istio.io require a supported monitored resource like k8s_container.
      MonitoredResource resource =
          MonitoredResource.newBuilder()
              .setType("k8s_container")
              .putLabels("project_id", projectId)
              .putLabels("location", "us-central1-a")
              .putLabels("cluster_name", "example-cluster")
              .putLabels("namespace_name", "default")
              .putLabels("pod_name", "example-pod")
              .putLabels("container_name", "example-container")
              .build();

      TimeSeries timeSeries =
          TimeSeries.newBuilder()
              .setMetric(metric)
              .setResource(resource)
              .setMetricKind(MetricKind.CUMULATIVE)
              .setValueType(ValueType.INT64)
              .addPoints(point)
              .build();

      List<TimeSeries> timeSeriesList = Collections.singletonList(timeSeries);
      client.createServiceTimeSeries(name, timeSeriesList);

      System.out.println("Created service time series for " + name);
    }
  }
}
// [END monitoring_v3_metricservice_servicetimeseries_create]
