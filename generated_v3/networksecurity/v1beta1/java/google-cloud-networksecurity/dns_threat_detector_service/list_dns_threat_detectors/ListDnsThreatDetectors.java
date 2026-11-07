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

// [START networksecurity_v1beta1_dnsthreatdetectorservice_dnsthreatdetectors_list]
import com.google.cloud.networksecurity.v1beta1.DnsThreatDetector;
import com.google.cloud.networksecurity.v1beta1.DnsThreatDetectorServiceClient;
import com.google.cloud.networksecurity.v1beta1.ListDnsThreatDetectorsRequest;

public class ListDnsThreatDetectors {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listDnsThreatDetectors(projectId, locationId);
  }

  public static void listDnsThreatDetectors(String projectId, String locationId) throws Exception {
    try (DnsThreatDetectorServiceClient client = DnsThreatDetectorServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListDnsThreatDetectorsRequest request =
          ListDnsThreatDetectorsRequest.newBuilder().setParent(parent).build();

      for (DnsThreatDetector threatDetector : client.listDnsThreatDetectors(request).iterateAll()) {
        System.out.println("Found DNS Threat Detector: " + threatDetector.getName());
      }
    }
  }
}
// [END networksecurity_v1beta1_dnsthreatdetectorservice_dnsthreatdetectors_list]
