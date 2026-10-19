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

// [START bigquerydatapolicy_v2_datapolicyservice_grantees_remove]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicy;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyName;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyServiceClient;
import com.google.cloud.bigquery.datapolicies.v2.RemoveGranteesRequest;
import java.io.IOException;
import java.util.List;

public class RemoveGrantees {

  /**
   * Removes IAM principals (grantees) from an existing data policy.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the data policy (for example, "us-central1").
   * @param dataPolicyId The ID of the data policy from which grantees will be removed (for
   *     example, "example_data_policy").
   * @param grantees A list of IAM V2 principals to remove (for example,
   *     List.of("principal://goog/subject/jane@example.com")).
   */
  public static void removeGrantees(
      String projectId, String location, String dataPolicyId, List<String> grantees) {
    DataPolicyName dataPolicyName = DataPolicyName.of(projectId, location, dataPolicyId);

    RemoveGranteesRequest request =
        RemoveGranteesRequest.newBuilder()
            .setDataPolicy(dataPolicyName.toString())
            .addAllGrantees(grantees)
            .build();

    try (DataPolicyServiceClient client = DataPolicyServiceClient.create()) {
      DataPolicy response = client.removeGrantees(request);

      System.out.printf("Successfully removed grantees from data policy: %s%n", response.getName());
      System.out.printf("Updated Grantees List: %s%n", String.join(", ", response.getGranteesList()));
    } catch (NotFoundException err) {
      System.err.printf(
          "error: data policy '%s' not found: %s%n", dataPolicyName, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to remove grantees from data policy '%s': %s%n",
          dataPolicyName, err.getMessage());
    }
  }

  // [END bigquerydatapolicy_v2_datapolicyservice_grantees_remove]

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

    String dataPolicyId = System.getenv("DATA_POLICY_ID");
    if (args.length > 2) {
      dataPolicyId = args[2];
    }
    if (dataPolicyId == null || dataPolicyId.isEmpty()) {
      dataPolicyId = "example_data_policy_id";
    }

    List<String> grantees = List.of("principal://goog/subject/sigje@google.com");
    if (args.length > 3) {
      grantees = List.of(args[3]);
    }

    removeGrantees(projectId, location, dataPolicyId, grantees);
  }
}
