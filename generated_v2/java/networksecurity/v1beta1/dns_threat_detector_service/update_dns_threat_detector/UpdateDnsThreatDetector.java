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

package com.google.cloud.networksecurity.v1beta1;

// [START networksecurity_v1beta1_dnsthreatdetectorservice_dnsthreatdetector_update]
import com.google.cloud.networksecurity.v1beta1.DnsThreatDetector;
import com.google.cloud.networksecurity.v1beta1.DnsThreatDetectorServiceClient;
import com.google.cloud.networksecurity.v1beta1.UpdateDnsThreatDetectorRequest;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateDnsThreatDetector {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String dnsThreatDetectorId = "example-dns-threat-detector-id";
    updateDnsThreatDetector(projectId, locationId, dnsThreatDetectorId);
  }

  public static void updateDnsThreatDetector(
      String projectId, String locationId, String dnsThreatDetectorId)
      throws IOException {
    try (DnsThreatDetectorServiceClient client = DnsThreatDetectorServiceClient.create()) {
      DnsThreatDetector dnsThreatDetector =
          DnsThreatDetector.newBuilder()
              .setName(
                  String.format(
                      "projects/%s/locations/%s/dnsThreatDetectors/%s",
                      projectId, locationId, dnsThreatDetectorId))
              .putLabels("env", "test")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();

      UpdateDnsThreatDetectorRequest request =
          UpdateDnsThreatDetectorRequest.newBuilder()
              .setDnsThreatDetector(dnsThreatDetector)
              .setUpdateMask(updateMask)
              .build();

      DnsThreatDetector response = client.updateDnsThreatDetector(request);

      System.out.println("Updated DNS Threat Detector: " + response.getName());
    }
  }
}
// [END networksecurity_v1beta1_dnsthreatdetectorservice_dnsthreatdetector_update]
