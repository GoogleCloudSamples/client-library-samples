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

// [START bigquerydatapolicy_v2beta1_datapolicyservice_datapolicies_list]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datapolicies.v2beta1.DataPolicy;
import com.google.cloud.bigquery.datapolicies.v2beta1.DataPolicyServiceClient;
import com.google.cloud.bigquery.datapolicies.v2beta1.DataPolicyServiceClient.ListDataPoliciesPagedResponse;
import com.google.cloud.bigquery.datapolicies.v2beta1.LocationName;
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

    try (DataPolicyServiceClient client = DataPolicyServiceClient.create()) {
      System.out.printf(
          "Listing data policies for project '%s' in location '%s':%n", projectId, location);
      ListDataPoliciesPagedResponse pageResult = client.listDataPolicies(parent);

      boolean foundPolicies = false;
      for (DataPolicy dataPolicy : pageResult.iterateAll()) {
        foundPolicies = true;
        System.out.printf("  Data Policy Name: %s%n", dataPolicy.getName());
        System.out.printf("  Data Policy Type: %s%n", dataPolicy.getDataPolicyType());
        if (dataPolicy.hasDataMaskingPolicy()) {
          System.out.printf(
              "  Data Masking Policy: %s%n",
              dataPolicy.getDataMaskingPolicy().getPredefinedExpression());
        }
        if (!dataPolicy.getGranteesList().isEmpty()) {
          System.out.printf("  Grantees: %s%n", String.join(", ", dataPolicy.getGranteesList()));
        }
        System.out.println("---");
      }

      if (!foundPolicies) {
        System.out.printf(
            "No data policies found for project '%s' in location '%s'.%n", projectId, location);
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

  // [END bigquerydatapolicy_v2beta1_datapolicyservice_datapolicies_list]

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
