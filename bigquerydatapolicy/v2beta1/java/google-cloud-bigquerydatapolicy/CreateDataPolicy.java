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

// [START bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_create]
import com.google.api.gax.rpc.AlreadyExistsException;
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.datapolicies.v2beta1.CreateDataPolicyRequest;
import com.google.cloud.bigquery.datapolicies.v2beta1.DataMaskingPolicy;
import com.google.cloud.bigquery.datapolicies.v2beta1.DataMaskingPolicy.PredefinedExpression;
import com.google.cloud.bigquery.datapolicies.v2beta1.DataPolicy;
import com.google.cloud.bigquery.datapolicies.v2beta1.DataPolicy.DataPolicyType;
import com.google.cloud.bigquery.datapolicies.v2beta1.DataPolicyServiceClient;
import com.google.cloud.bigquery.datapolicies.v2beta1.LocationName;
import java.io.IOException;

public class CreateDataPolicy {

  /**
   * Creates a data policy in the BigQuery Data Policy API that applies a predefined data masking
   * rule to a specified data column.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the data policy (for example, "us-central1").
   * @param dataPolicyId The user-assigned ID for the new data policy (for example, "my_data_policy").
   */
  public static void createDataPolicy(String projectId, String location, String dataPolicyId) {
    LocationName parent = LocationName.of(projectId, location);

    DataMaskingPolicy dataMaskingPolicy =
        DataMaskingPolicy.newBuilder()
            .setPredefinedExpression(PredefinedExpression.DEFAULT_MASKING_VALUE)
            .build();

    DataPolicy dataPolicy =
        DataPolicy.newBuilder()
            .setDataPolicyType(DataPolicyType.DATA_MASKING_POLICY)
            .setDataMaskingPolicy(dataMaskingPolicy)
            .build();

    CreateDataPolicyRequest request =
        CreateDataPolicyRequest.newBuilder()
            .setParent(parent.toString())
            .setDataPolicyId(dataPolicyId)
            .setDataPolicy(dataPolicy)
            .build();

    try (DataPolicyServiceClient client = DataPolicyServiceClient.create()) {
      DataPolicy response = client.createDataPolicy(request);

      System.out.printf("Successfully created data policy: %s%n", response.getName());
      System.out.printf("Data Policy ID: %s%n", response.getDataPolicyId());
      System.out.printf("Data Policy Type: %s%n", response.getDataPolicyType());
      if (response.hasDataMaskingPolicy()) {
        System.out.printf(
            "Data Masking Policy Predefined Expression: %s%n",
            response.getDataMaskingPolicy().getPredefinedExpression());
      }
    } catch (AlreadyExistsException err) {
      System.err.printf(
          "error: data policy '%s' already exists in location '%s' for project '%s': %s%n",
          dataPolicyId, location, projectId, err.getMessage());
    } catch (NotFoundException err) {
      System.err.printf(
          "error: project '%s' or location '%s' was not found: %s%n",
          projectId, location, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to create data policy '%s' in location '%s' for project '%s': %s%n",
          dataPolicyId, location, projectId, err.getMessage());
    }
  }

  // [END bigquerydatapolicy_v2beta1_datapolicyservice_datapolicy_create]

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
    // BigQuery Data Policy IDs require underscores rather than hyphens.
    dataPolicyId = dataPolicyId.replace('-', '_');

    createDataPolicy(projectId, location, dataPolicyId);
  }
}
