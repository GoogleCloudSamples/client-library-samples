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

// [START networkconnectivity_v1_internalrangeservice_internalrange_update]
import com.google.cloud.networkconnectivity.v1.InternalRange;
import com.google.cloud.networkconnectivity.v1.InternalRangeName;
import com.google.cloud.networkconnectivity.v1.InternalRangeServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateInternalRange {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String internalRangeId = "example-internal_range_id";
    updateInternalRange(projectId, locationId, internalRangeId);
  }

  public static void updateInternalRange(
      String projectId, String locationId, String internalRangeId) throws Exception {
    try (InternalRangeServiceClient client = InternalRangeServiceClient.create()) {
      InternalRange internalRange =
          InternalRange.newBuilder()
              .setName(InternalRangeName.of(projectId, locationId, internalRangeId).toString())
              .setDescription("Updated internal range description")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("description").build();

      // Wait for the long-running operation to complete.
      InternalRange response =
          client.updateInternalRangeAsync(internalRange, updateMask).get(5, TimeUnit.MINUTES);

      System.out.println("Updated internal range: " + response.getName());
    }
  }
}
// [END networkconnectivity_v1_internalrangeservice_internalrange_update]
