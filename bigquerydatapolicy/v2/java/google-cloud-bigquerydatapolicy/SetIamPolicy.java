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

// [START bigquerydatapolicy_v2_datapolicyservice_iampolicy_set]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyName;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyServiceClient;
import com.google.iam.v1.Binding;
import com.google.iam.v1.GetIamPolicyRequest;
import com.google.iam.v1.Policy;
import com.google.iam.v1.SetIamPolicyRequest;
import java.io.IOException;
import java.util.Base64;

public class SetIamPolicy {

  /**
   * Sets the IAM policy for a specified data policy resource from the BigQuery Data Policy API.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the data policy (for example, "us-central1").
   * @param dataPolicyId The ID of the data policy (for example, "my_data_policy").
   * @param member The IAM principal to be added (for example, "user:example@gmail.com").
   * @param role The IAM role to grant (for example, "roles/viewer").
   */
  public static void setIamPolicy(
      String projectId, String location, String dataPolicyId, String member, String role) {
    DataPolicyName resourceName = DataPolicyName.of(projectId, location, dataPolicyId);

    try (DataPolicyServiceClient client = DataPolicyServiceClient.create()) {
      // First, get the current policy to preserve existing bindings and etag.
      GetIamPolicyRequest getRequest =
          GetIamPolicyRequest.newBuilder().setResource(resourceName.toString()).build();
      Policy currentPolicy = client.getIamPolicy(getRequest);

      Binding newBinding = Binding.newBuilder().setRole(role).addMembers(member).build();
      Policy updatedPolicyPayload =
          currentPolicy.toBuilder().addBindings(newBinding).build();

      SetIamPolicyRequest setRequest =
          SetIamPolicyRequest.newBuilder()
              .setResource(resourceName.toString())
              .setPolicy(updatedPolicyPayload)
              .build();

      Policy updatedPolicy = client.setIamPolicy(setRequest);

      System.out.printf("Successfully updated IAM policy for data policy: %s%n", resourceName);
      System.out.printf("New Binding added: %s for %s%n", role, member);
      System.out.printf(
          "Updated ETag: %s%n",
          Base64.getEncoder().encodeToString(updatedPolicy.getEtag().toByteArray()));
    } catch (NotFoundException err) {
      System.err.printf("error: data policy '%s' not found: %s%n", resourceName, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to set IAM policy for data policy '%s': %s%n",
          resourceName, err.getMessage());
    }
  }

  // [END bigquerydatapolicy_v2_datapolicyservice_iampolicy_set]

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

    String member = "user:sigje@google.com";
    if (args.length > 3) {
      member = args[3];
    }

    String role = "roles/viewer";
    if (args.length > 4) {
      role = args[4];
    }

    setIamPolicy(projectId, location, dataPolicyId, member, role);
  }
}
