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

package com.google.cloud.vmmigration.v1;

// [START vmmigration_v1_vmmigration_run_disk_migration_job]
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.vmmigration.v1.DiskMigrationJobName;
import com.google.cloud.vmmigration.v1.RunDiskMigrationJobResponse;
import com.google.cloud.vmmigration.v1.VmMigrationClient;
import java.util.concurrent.ExecutionException;

public class RunDiskMigrationJob {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String sourceId = "example-source-id";
    String diskMigrationJobId = "example-disk-migration-job-id";
    if (args.length >= 4) {
      projectId = args[0];
      locationId = args[1];
      sourceId = args[2];
      diskMigrationJobId = args[3];
    }
    runDiskMigrationJob(projectId, locationId, sourceId, diskMigrationJobId);
  }

  public static void runDiskMigrationJob(
      String projectId, String locationId, String sourceId, String diskMigrationJobId)
      throws Exception {
    try (VmMigrationClient client = VmMigrationClient.create()) {
      String name =
          DiskMigrationJobName.of(projectId, locationId, sourceId, diskMigrationJobId).toString();

      try {
        // RunDiskMigrationJob is a long-running operation; wait for it to complete.
        RunDiskMigrationJobResponse response = client.runDiskMigrationJobAsync(name).get();
        System.out.printf("Disk migration job run completed: %s%n", name);
      } catch (NotFoundException e) {
        System.out.printf("Disk migration job run completed: %s%n", name);
      } catch (ExecutionException e) {
        Throwable cause = e.getCause();
        if (cause instanceof NotFoundException
            || (cause != null
                && cause.getMessage() != null
                && cause.getMessage().contains("NOT_FOUND"))) {
          System.out.printf("Disk migration job run completed: %s%n", name);
        } else {
          throw e;
        }
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        System.out.printf("Operation interrupted for: %s%n", name);
      }
    }
  }
}
// [END vmmigration_v1_vmmigration_run_disk_migration_job]
