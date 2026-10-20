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

// [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_update]
// [START bigquerydatapolicy_datapolicyservice_datapolicy_update]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datapolicies.v2.DataMaskingPolicy;
import com.google.cloud.bigquery.datapolicies.v2.DataMaskingPolicy.PredefinedExpression;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicy;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyName;
import com.google.cloud.bigquery.datapolicies.v2.DataPolicyServiceClient;
import com.google.cloud.bigquery.datapolicies.v2.UpdateDataPolicyRequest;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateDataPolicy {

  /**
   * Updates the data masking configuration of an existing data policy.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the data policy (for example, "us-central1").
   * @param dataPolicyId The ID of the data policy to update (for example, "example_data_policy").
   */
  public static void updateDataPolicy(String projectId, String location, String dataPolicyId) {
    DataPolicyName dataPolicyName = DataPolicyName.of(projectId, location, dataPolicyId);

    try (DataPolicyServiceClient client = DataPolicyServiceClient.create()) {
      // Retrieve the existing policy so its etag can be used to prevent race conditions.
      DataPolicy existingPolicy = client.getDataPolicy(dataPolicyName);

      DataPolicy updatedDataPolicy =
          DataPolicy.newBuilder()
              .setName(dataPolicyName.toString())
              .setDataMaskingPolicy(
                  DataMaskingPolicy.newBuilder()
                      .setPredefinedExpression(PredefinedExpression.SHA256)
                      .build())
              .setEtag(existingPolicy.getEtag())
              .build();

      FieldMask updateMask = FieldMask.newBuilder().addPaths("data_masking_policy").build();

      UpdateDataPolicyRequest request =
          UpdateDataPolicyRequest.newBuilder()
              .setDataPolicy(updatedDataPolicy)
              .setUpdateMask(updateMask)
              .build();

      DataPolicy response = client.updateDataPolicy(request);

      System.out.printf("Successfully updated data policy: %s%n", response.getName());
      System.out.printf("New data policy type: %s%n", response.getDataPolicyType());
      if (response.hasDataMaskingPolicy()) {
        System.out.printf(
            "New masking expression: %s%n",
            response.getDataMaskingPolicy().getPredefinedExpression());
      }
    } catch (NotFoundException err) {
      System.err.printf(
          "error: data policy '%s' not found: %s%n", dataPolicyName, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to update data policy '%s': %s%n", dataPolicyName, err.getMessage());
    }
  }

  // [END bigquerydatapolicy_datapolicyservice_datapolicy_update]
  // [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_update]

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

    updateDataPolicy(projectId, location, dataPolicyId);
  }
}
