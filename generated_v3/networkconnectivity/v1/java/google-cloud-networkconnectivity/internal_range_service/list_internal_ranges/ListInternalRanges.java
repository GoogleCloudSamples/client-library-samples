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

package com.google.cloud.networkconnectivity.v1;

// [START networkconnectivity_v1_internalrangeservice_internalranges_list]
import com.google.cloud.networkconnectivity.v1.InternalRange;
import com.google.cloud.networkconnectivity.v1.InternalRangeServiceClient;
import com.google.cloud.networkconnectivity.v1.LocationName;
import java.io.IOException;

public class ListInternalRanges {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    listInternalRanges(projectId, locationId);
  }

  public static void listInternalRanges(String projectId, String locationId) throws Exception {
    try (InternalRangeServiceClient client = InternalRangeServiceClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();
      for (InternalRange internalRange : client.listInternalRanges(parent).iterateAll()) {
        System.out.println("Internal range: " + internalRange.getName());
        System.out.println("IP CIDR range: " + internalRange.getIpCidrRange());
        System.out.println("Network: " + internalRange.getNetwork());
      }
    }
  }
}
// [END networkconnectivity_v1_internalrangeservice_internalranges_list]
