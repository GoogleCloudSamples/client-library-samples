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

// [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_delete]
// [START bigquerydatapolicy_datapolicyservice_datapolicy_delete]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyName;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyServiceClient;
import java.io.IOException;

public class DeleteDataPolicy {

  /**
   * Deletes a data policy from the BigQuery Data Policy API.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the data policy (for example, "us-central1").
   * @param dataPolicyId The ID of the data policy to delete (for example, "my_data_policy").
   */
  public static void deleteDataPolicy(String projectId, String location, String dataPolicyId) {
    DataPolicyName name = DataPolicyName.of(projectId, location, dataPolicyId);

    try (DataPolicyServiceClient client = DataPolicyServiceClient.create()) {
      client.deleteDataPolicy(name);
      System.out.printf("Successfully deleted data policy: %s%n", name);
    } catch (NotFoundException err) {
      System.err.printf(
          "error: data policy '%s' not found: %s%n", name, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to delete data policy '%s': %s%n", name, err.getMessage());
    }
  }

  // [END bigquerydatapolicy_datapolicyservice_datapolicy_delete]
  // [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_delete]

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

    deleteDataPolicy(projectId, location, dataPolicyId);
  }
}
