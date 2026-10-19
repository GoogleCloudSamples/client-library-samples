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

// [START bigquerydatapolicy_v2_datapolicyservice_iam_permissions_test]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyName;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyServiceClient;
import com.google.iam.v1.TestIamPermissionsRequest;
import com.google.iam.v1.TestIamPermissionsResponse;
import java.io.IOException;
import java.util.List;

public class TestIamPermissions {

  /**
   * Tests whether the caller has the specified IAM permissions for a data policy resource.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the data policy (for example, "us-central1").
   * @param dataPolicyId The ID of the data policy to test permissions for.
   * @param permissions A list of permissions to test (for example,
   *     List.of("bigquery.dataPolicies.get")).
   */
  public static void testIamPermissions(
      String projectId, String location, String dataPolicyId, List<String> permissions) {
    DataPolicyName resourceName = DataPolicyName.of(projectId, location, dataPolicyId);

    TestIamPermissionsRequest request =
        TestIamPermissionsRequest.newBuilder()
            .setResource(resourceName.toString())
            .addAllPermissions(permissions)
            .build();

    try (DataPolicyServiceClient client = DataPolicyServiceClient.create()) {
      TestIamPermissionsResponse response = client.testIamPermissions(request);

      System.out.printf("Tested permissions for data policy: %s%n", resourceName);
      if (response.getPermissionsCount() > 0) {
        System.out.printf(
            "Caller has the following permissions: %s%n",
            String.join(", ", response.getPermissionsList()));
      } else {
        System.out.println("Caller has NONE of the requested permissions.");
      }
    } catch (NotFoundException err) {
      System.err.printf("error: data policy '%s' not found: %s%n", resourceName, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to test IAM permissions for data policy '%s': %s%n",
          resourceName, err.getMessage());
    }
  }

  // [END bigquerydatapolicy_v2_datapolicyservice_iam_permissions_test]

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

    List<String> permissions = List.of("bigquery.dataPolicies.get");
    if (args.length > 3) {
      permissions = List.of(args[3]);
    }

    testIamPermissions(projectId, location, dataPolicyId, permissions);
  }
}
