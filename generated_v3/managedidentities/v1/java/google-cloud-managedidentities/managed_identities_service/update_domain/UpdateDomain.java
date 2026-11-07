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

package com.google.cloud.managedidentities.v1;

// [START managedidentities_v1_managedidentitiesservice_domain_update]
import com.google.cloud.managedidentities.v1.Domain;
import com.google.cloud.managedidentities.v1.DomainName;
import com.google.cloud.managedidentities.v1.ManagedIdentitiesServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class UpdateDomain {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String domainId = "example-domain_id";
    updateDomain(projectId, locationId, domainId);
  }

  public static void updateDomain(String projectId, String locationId, String domainId)
      throws Exception {
    try (ManagedIdentitiesServiceClient client = ManagedIdentitiesServiceClient.create()) {
      FieldMask updateMask = FieldMask.newBuilder().addPaths("labels").build();
      Domain domain =
          Domain.newBuilder()
              .setName(DomainName.of(projectId, locationId, domainId).toString())
              .putLabels("env", "test")
              .build();

      Domain response = client.updateDomainAsync(domain, updateMask).get();
      System.out.println("Updated domain: " + response.getName());
    }
  }
}
// [END managedidentities_v1_managedidentitiesservice_domain_update]
