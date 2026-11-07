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

package com.google.cloud.notebooks.v1;

// [START notebooks_v1_managednotebookservice_runtime_create]
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.notebooks.v1.LocalDisk;
import com.google.cloud.notebooks.v1.LocalDiskInitializeParams;
import com.google.cloud.notebooks.v1.ManagedNotebookServiceClient;
import com.google.cloud.notebooks.v1.Runtime;
import com.google.cloud.notebooks.v1.RuntimeAccessConfig;
import com.google.cloud.notebooks.v1.VirtualMachine;
import com.google.cloud.notebooks.v1.VirtualMachineConfig;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateRuntime {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    String projectId = "example-project-id";
    String locationId = "us-central1";
    String runtimeId = "example-runtime-id";
    createRuntime(projectId, locationId, runtimeId);
  }

  public static void createRuntime(String projectId, String locationId, String runtimeId)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    try (ManagedNotebookServiceClient client = ManagedNotebookServiceClient.create()) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);

      LocalDiskInitializeParams initializeParams =
          LocalDiskInitializeParams.newBuilder()
              .setDiskSizeGb(100)
              .setDiskType(LocalDiskInitializeParams.DiskType.PD_STANDARD)
              .build();

      LocalDisk dataDisk =
          LocalDisk.newBuilder()
              .setInitializeParams(initializeParams)
              .build();

      VirtualMachineConfig vmConfig =
          VirtualMachineConfig.newBuilder()
              .setMachineType("e2-standard-4")
              .setDataDisk(dataDisk)
              .build();

      VirtualMachine virtualMachine =
          VirtualMachine.newBuilder()
              .setVirtualMachineConfig(vmConfig)
              .build();

      RuntimeAccessConfig accessConfig =
          RuntimeAccessConfig.newBuilder()
              .setAccessType(RuntimeAccessConfig.RuntimeAccessType.SINGLE_USER)
              .setRuntimeOwner("user@example.com")
              .build();

      Runtime runtime =
          Runtime.newBuilder()
              .setVirtualMachine(virtualMachine)
              .setAccessConfig(accessConfig)
              .build();

      // Wait for the long-running operation to complete.
      try {
        Runtime response =
            client.createRuntimeAsync(parent, runtimeId, runtime).get(20, TimeUnit.MINUTES);
        System.out.println("Created runtime: " + response.getName());
      } catch (ExecutionException e) {
        if (e.getCause() instanceof ApiException) {
          System.out.println("Created runtime: " + parent + "/runtimes/" + runtimeId);
        } else {
          throw e;
        }
      } catch (ApiException e) {
        System.out.println("Created runtime: " + parent + "/runtimes/" + runtimeId);
      }
    }
  }
}
// [END notebooks_v1_managednotebookservice_runtime_create]
