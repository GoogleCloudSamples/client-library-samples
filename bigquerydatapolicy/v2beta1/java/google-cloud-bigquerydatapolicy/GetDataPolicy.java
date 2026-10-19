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

// [START bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_get]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datapolicies.v2beta1.DataPolicy;
import com.google.cloud.bigquery.datapolicies.v2beta1.DataPolicyName;
import com.google.cloud.bigquery.datapolicies.v2beta1.DataPolicyServiceClient;
import java.io.IOException;

public class GetDataPolicy {

  /**
   * Gets a specific data policy from the BigQuery Data Policy API by its resource name.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the data policy (for example, "us-central1").
   * @param dataPolicyId The ID of the data policy to retrieve (for example, "my_data_policy").
   */
  public static void getDataPolicy(String projectId, String location, String dataPolicyId) {
    DataPolicyName name = DataPolicyName.of(projectId, location, dataPolicyId);

    try (DataPolicyServiceClient client = DataPolicyServiceClient.create()) {
      DataPolicy response = client.getDataPolicy(name);

      System.out.printf("Successfully retrieved data policy: %s%n", response.getName());
      System.out.printf("  Data Policy ID: %s%n", response.getDataPolicyId());
      System.out.printf("  Data Policy Type: %s%n", response.getDataPolicyType());
      if (response.hasDataMaskingPolicy()) {
        System.out.printf(
            "  Data Masking Policy: %s%n",
            response.getDataMaskingPolicy().getPredefinedExpression());
      }
      if (!response.getGranteesList().isEmpty()) {
        System.out.printf("  Grantees: %s%n", String.join(", ", response.getGranteesList()));
      }
    } catch (NotFoundException err) {
      System.err.printf("error: data policy '%s' not found: %s%n", name, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf("error: failed to get data policy '%s': %s%n", name, err.getMessage());
    }
  }

  // [END bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_get]

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

    getDataPolicy(projectId, location, dataPolicyId);
  }
}
