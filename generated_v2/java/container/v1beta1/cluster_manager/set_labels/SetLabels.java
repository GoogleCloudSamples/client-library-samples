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

package com.google.cloud.container.v1beta1;

// [START container_v1beta1_clustermanager_set_labels]
import com.google.cloud.container.v1beta1.ClusterManagerClient;
import com.google.container.v1beta1.Cluster;
import com.google.container.v1beta1.GetClusterRequest;
import com.google.container.v1beta1.Operation;
import com.google.container.v1beta1.SetLabelsRequest;
import java.util.Collections;
import java.util.Map;

public class SetLabels {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String clusterId = "example-cluster-id";
    setLabels(projectId, locationId, clusterId);
  }

  public static void setLabels(String projectId, String locationId, String clusterId)
      throws Exception {
    try (ClusterManagerClient client = ClusterManagerClient.create()) {
      String name =
          String.format("projects/%s/locations/%s/clusters/%s", projectId, locationId, clusterId);

      // Retrieve the cluster to obtain the latest label fingerprint and avoid concurrency conflicts.
      GetClusterRequest getClusterRequest =
          GetClusterRequest.newBuilder().setName(name).build();
      Cluster cluster = client.getCluster(getClusterRequest);
      String labelFingerprint = cluster.getLabelFingerprint();

      Map<String, String> resourceLabels = Collections.singletonMap("env", "test");

      SetLabelsRequest request =
          SetLabelsRequest.newBuilder()
              .setName(name)
              .setLabelFingerprint(labelFingerprint)
              .putAllResourceLabels(resourceLabels)
              .build();

      Operation response = client.setLabels(request);
      System.out.println("Set labels operation initiated: " + response.getName());
    }
  }
}
// [END container_v1beta1_clustermanager_set_labels]
