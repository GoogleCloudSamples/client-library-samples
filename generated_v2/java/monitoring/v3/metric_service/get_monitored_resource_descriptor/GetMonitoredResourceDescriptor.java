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

// [START monitoring_v3_metricservice_monitoredresourcedescriptor_get]
import com.google.api.MonitoredResourceDescriptor;
import com.google.cloud.monitoring.v3.MetricServiceClient;
import java.io.IOException;

public class GetMonitoredResourceDescriptor {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String monitoredResourceDescriptorId = "example-monitored-resource-descriptor-id";
    getMonitoredResourceDescriptor(projectId, monitoredResourceDescriptorId);
  }

  public static void getMonitoredResourceDescriptor(
      String projectId, String monitoredResourceDescriptorId) throws Exception {
    try (MetricServiceClient client = MetricServiceClient.create()) {
      String name =
          String.format(
              "projects/%s/monitoredResourceDescriptors/%s",
              projectId, monitoredResourceDescriptorId);

      MonitoredResourceDescriptor response = client.getMonitoredResourceDescriptor(name);

      System.out.println("Monitored resource descriptor retrieved: " + response.getName());
      System.out.println("Type: " + response.getType());
      System.out.println("Display name: " + response.getDisplayName());
      System.out.println("Description: " + response.getDescription());
    }
  }
}
// [END monitoring_v3_metricservice_monitoredresourcedescriptor_get]
