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

package com.google.cloud.networkconnectivity.v1beta;

// [START networkconnectivity_v1beta_datatransferservice_multiclouddatatransfersupportedservices_list]
import com.google.cloud.networkconnectivity.v1beta.DataTransferServiceClient;
import com.google.cloud.networkconnectivity.v1beta.ListMulticloudDataTransferSupportedServicesRequest;
import com.google.cloud.networkconnectivity.v1beta.MulticloudDataTransferSupportedService;

public class ListMulticloudDataTransferSupportedServices {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listMulticloudDataTransferSupportedServices(projectId, locationId);
  }

  public static void listMulticloudDataTransferSupportedServices(
      String projectId, String locationId) throws Exception {
    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      ListMulticloudDataTransferSupportedServicesRequest request =
          ListMulticloudDataTransferSupportedServicesRequest.newBuilder()
              .setParent(parent)
              .build();

      for (MulticloudDataTransferSupportedService service :
          client.listMulticloudDataTransferSupportedServices(request).iterateAll()) {
        System.out.println("Supported service: " + service.getName());
      }
    }
  }
}
// [END networkconnectivity_v1beta_datatransferservice_multiclouddatatransfersupportedservices_list]
