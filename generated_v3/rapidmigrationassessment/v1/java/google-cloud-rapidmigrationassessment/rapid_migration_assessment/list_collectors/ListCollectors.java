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

package com.google.cloud.rapidmigrationassessment.v1;

// [START rapidmigrationassessment_v1_rapidmigrationassessment_collectors_list]
import com.google.cloud.rapidmigrationassessment.v1.Collector;
import com.google.cloud.rapidmigrationassessment.v1.LocationName;
import com.google.cloud.rapidmigrationassessment.v1.RapidMigrationAssessmentClient;

public class ListCollectors {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    listCollectors(projectId, locationId);
  }

  public static void listCollectors(String projectId, String locationId) throws Exception {
    // Initialize client that will be closed when the block exits.
    try (RapidMigrationAssessmentClient client = RapidMigrationAssessmentClient.create()) {
      String parent = LocationName.of(projectId, locationId).toString();

      for (Collector collector : client.listCollectors(parent).iterateAll()) {
        System.out.println("Collector name: " + collector.getName());
        System.out.println("Collector state: " + collector.getState());
      }
    }
  }
}
// [END rapidmigrationassessment_v1_rapidmigrationassessment_collectors_list]
