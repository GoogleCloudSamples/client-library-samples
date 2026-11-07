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

// [START monitoring_v3_metricservice_monitoredresourcedescriptors_list]
import com.google.api.MonitoredResourceDescriptor;
import com.google.cloud.monitoring.v3.MetricServiceClient;
import com.google.monitoring.v3.ListMonitoredResourceDescriptorsRequest;
import java.io.IOException;

public class ListMonitoredResourceDescriptors {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    listMonitoredResourceDescriptors(projectId);
  }

  public static void listMonitoredResourceDescriptors(String projectId) throws Exception {
    try (MetricServiceClient client = MetricServiceClient.create()) {
      String name = "projects/" + projectId;
      ListMonitoredResourceDescriptorsRequest request =
          ListMonitoredResourceDescriptorsRequest.newBuilder().setName(name).build();

      for (MonitoredResourceDescriptor descriptor :
          client.listMonitoredResourceDescriptors(request).iterateAll()) {
        System.out.println("Resource type: " + descriptor.getType());
        System.out.println("Display name: " + descriptor.getDisplayName());
        System.out.println("Description: " + descriptor.getDescription());
      }
    }
  }
}
// [END monitoring_v3_metricservice_monitoredresourcedescriptors_list]
