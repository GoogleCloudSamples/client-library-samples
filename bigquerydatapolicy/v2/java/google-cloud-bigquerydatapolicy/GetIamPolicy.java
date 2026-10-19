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

// [START bigquerydatapolicy_v2_datapolicyservice_iampolicy_get]
// [START bigquerydatapolicy_datapolicyservice_iampolicy_get]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyName;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyServiceClient;
import com.google.iam.v1.Binding;
import com.google.iam.v1.GetIamPolicyRequest;
import com.google.iam.v1.Policy;
import java.io.IOException;

public class GetIamPolicy {

  /**
   * Gets the IAM policy for a specified data policy resource from the BigQuery Data Policy API.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the data policy (for example, "us-central1").
   * @param dataPolicyId The ID of the data policy (for example, "my_data_policy").
   */
  public static void getIamPolicy(String projectId, String location, String dataPolicyId) {
    DataPolicyName resourceName = DataPolicyName.of(projectId, location, dataPolicyId);

    GetIamPolicyRequest request =
        GetIamPolicyRequest.newBuilder().setResource(resourceName.toString()).build();

    try (DataPolicyServiceClient client = DataPolicyServiceClient.create()) {
      Policy policy = client.getIamPolicy(request);

      System.out.printf("Successfully retrieved IAM policy for data policy: %s%n", resourceName);
      System.out.printf("Policy Version: %d%n", policy.getVersion());
      if (policy.getBindingsCount() > 0) {
        System.out.println("Policy Bindings:");
        for (Binding binding : policy.getBindingsList()) {
          System.out.printf("  Role: %s%n", binding.getRole());
          System.out.printf("  Members: %s%n", String.join(", ", binding.getMembersList()));
          if (binding.hasCondition() && !binding.getCondition().getExpression().isEmpty()) {
            System.out.printf("  Condition: %s%n", binding.getCondition().getExpression());
          }
        }
      } else {
        System.out.println("No bindings found in the policy.");
      }
    } catch (NotFoundException err) {
      System.err.printf("error: data policy '%s' not found: %s%n", resourceName, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to get IAM policy for data policy '%s': %s%n",
          resourceName, err.getMessage());
    }
  }

  // [END bigquerydatapolicy_datapolicyservice_iampolicy_get]
  // [END bigquerydatapolicy_v2_datapolicyservice_iampolicy_get]

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

    getIamPolicy(projectId, location, dataPolicyId);
  }
}
