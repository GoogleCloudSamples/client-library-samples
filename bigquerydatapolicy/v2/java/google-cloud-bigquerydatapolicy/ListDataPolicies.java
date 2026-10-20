/*
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START bigquerydatapolicy_v2_datapolicyservice_datapolicies_list]
// [START bigquerydatapolicy_datapolicyservice_datapolicies_list]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicy;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyServiceClient;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyServiceClient.ListDataPoliciesPagedResponse;
import com.google.cloud.bigquery.datapolicies.v2.ListDataPoliciesRequest;
import com.google.cloud.bigquery.datapolicies.v2.LocationName;
import java.io.IOException;

public class ListDataPolicies {

  /**
   * Lists all data policies in a specified project and location.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the data policies (for example, "us-central1").
   */
  public static void listDataPolicies(String projectId, String location) {
    LocationName parent = LocationName.of(projectId, location);

    ListDataPoliciesRequest request =
        ListDataPoliciesRequest.newBuilder().setParent(parent.toString()).build();

    try (DataPolicyServiceClient client = DataPolicyServiceClient.create()) {
      System.out.printf(
          "Listing data policies for project '%s' in location '%s':%n", projectId, location);
      ListDataPoliciesPagedResponse pageResult = client.listDataPolicies(request);

      boolean foundPolicies = false;
      for (DataPolicy dataPolicy : pageResult.iterateAll()) {
        foundPolicies = true;
        System.out.printf("  Data Policy Name: %s%n", dataPolicy.getName());
        System.out.printf("  Data Policy ID: %s%n", dataPolicy.getDataPolicyId());
        System.out.printf("  Data Policy Type: %s%n", dataPolicy.getDataPolicyType());
        if (!dataPolicy.getPolicyTag().isEmpty()) {
          System.out.printf("  Policy Tag: %s%n", dataPolicy.getPolicyTag());
        }
        if (!dataPolicy.getGranteesList().isEmpty()) {
          System.out.printf("  Grantees: %s%n", String.join(", ", dataPolicy.getGranteesList()));
        }
        System.out.println("--------------------");
      }

      if (!foundPolicies) {
        System.out.println("No data policies found.");
      }
    } catch (NotFoundException err) {
      System.err.printf(
          "error: project '%s' or location '%s' was not found: %s%n",
          projectId, location, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to list data policies in location '%s' for project '%s': %s%n",
          location, projectId, err.getMessage());
    }
  }

  // [END bigquerydatapolicy_datapolicyservice_datapolicies_list]
  // [END bigquerydatapolicy_v2_datapolicyservice_datapolicies_list]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (args.length > 0) {
      projectId = args[0];
    }
    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }

    String location = "us-central1";
    if (args.length > 1) {
      location = args[1];
    }

    listDataPolicies(projectId, location);
  }
}
