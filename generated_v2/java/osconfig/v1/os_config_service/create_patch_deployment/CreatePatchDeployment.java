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

package com.google.cloud.osconfig.v1;

// [START osconfig_v1_osconfigservice_patchdeployment_create]
import com.google.cloud.osconfig.v1.OsConfigServiceClient;
import com.google.cloud.osconfig.v1.PatchDeployments.OneTimeSchedule;
import com.google.cloud.osconfig.v1.PatchDeployments.PatchDeployment;
import com.google.cloud.osconfig.v1.PatchJobs.PatchInstanceFilter;
import com.google.cloud.osconfig.v1.ProjectName;
import com.google.protobuf.Duration;
import com.google.protobuf.Timestamp;
import java.io.IOException;

public class CreatePatchDeployment {

  public static void createPatchDeployment(String projectId, String patchDeploymentId)
      throws IOException {
    try (OsConfigServiceClient client = OsConfigServiceClient.create()) {
      String parent = ProjectName.of(projectId).toString();

      // Configure a one-time execution schedule starting one hour from now.
      Timestamp executeTime =
          Timestamp.newBuilder()
              .setSeconds((System.currentTimeMillis() / 1000) + 3600)
              .build();
      OneTimeSchedule schedule =
          OneTimeSchedule.newBuilder().setExecuteTime(executeTime).build();

      // Target all VM instances in the project.
      PatchInstanceFilter filter =
          PatchInstanceFilter.newBuilder().setAll(true).build();

      Duration duration = Duration.newBuilder().setSeconds(3600).build();

      PatchDeployment patchDeployment =
          PatchDeployment.newBuilder()
              .setDescription("Patch deployment for VM instances")
              .setInstanceFilter(filter)
              .setOneTimeSchedule(schedule)
              .setDuration(duration)
              .build();

      PatchDeployment response =
          client.createPatchDeployment(parent, patchDeployment, patchDeploymentId);
      System.out.println("Created patch deployment: " + response.getName());
    }
  }
}
// [END osconfig_v1_osconfigservice_patchdeployment_create]
