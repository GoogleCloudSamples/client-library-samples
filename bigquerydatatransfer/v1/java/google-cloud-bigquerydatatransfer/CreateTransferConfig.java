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

// [START bigquerydatatransfer_v1_datatransferservice_transferconfig_create]
// [START bigquerydatatransfer_datatransferservice_transferconfig_create]
// [START bigquerydatatransfer_create_cloudstorage_transfer]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.InvalidArgumentException;
import com.google.cloud.bigquery.datatransfer.v1.CreateTransferConfigRequest;
import com.google.cloud.bigquery.datatransfer.v1.DataTransferServiceClient;
import com.google.cloud.bigquery.datatransfer.v1.LocationName;
import com.google.cloud.bigquery.datatransfer.v1.TransferConfig;
import com.google.protobuf.Struct;
import com.google.protobuf.Value;
import java.io.IOException;

public class CreateTransferConfig {

  /**
   * Creates a transfer configuration for a Google Cloud Storage transfer.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the transfer config (for example, "us-central1").
   * @param sourceCloudStorageUri The Cloud Storage URI of the source data (for example,
   *     "gs://example-bucket/example-data.csv").
   * @param destinationDatasetId The BigQuery dataset ID to which data is transferred (for example,
   *     "example_dataset").
   * @param destinationTableName The BigQuery table name to which data is transferred (for example,
   *     "example_table").
   * @param serviceAccount The optional IAM service account email to use as the transfer owner.
   */
  public static void createTransferConfig(
      String projectId,
      String location,
      String sourceCloudStorageUri,
      String destinationDatasetId,
      String destinationTableName,
      String serviceAccount) {
    LocationName parent = LocationName.of(projectId, location);
    String dataSourceId = "google_cloud_storage";

    Struct params =
        Struct.newBuilder()
            .putFields(
                "data_path_template",
                Value.newBuilder().setStringValue(sourceCloudStorageUri).build())
            .putFields(
                "destination_table_name_template",
                Value.newBuilder().setStringValue(destinationTableName).build())
            .putFields("file_format", Value.newBuilder().setStringValue("CSV").build())
            .putFields("skip_leading_rows", Value.newBuilder().setStringValue("1").build())
            .build();

    TransferConfig transferConfig =
        TransferConfig.newBuilder()
            .setDisplayName("Example Cloud Storage Data Transfer")
            .setDataSourceId(dataSourceId)
            .setDestinationDatasetId(destinationDatasetId)
            .setParams(params)
            .build();

    CreateTransferConfigRequest.Builder requestBuilder =
        CreateTransferConfigRequest.newBuilder()
            .setParent(parent.toString())
            .setTransferConfig(transferConfig);
    if (serviceAccount != null && !serviceAccount.isEmpty()) {
      requestBuilder.setServiceAccountName(serviceAccount);
    }

    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      TransferConfig response = client.createTransferConfig(requestBuilder.build());
      System.out.printf("Created transfer config: %s%n", response.getName());
    } catch (InvalidArgumentException err) {
      System.err.printf(
          "error: could not create transfer config due to an invalid argument: %s%n",
          err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf("error: could not create transfer config: %s%n", err.getMessage());
    }
  }

  // [END bigquerydatatransfer_create_cloudstorage_transfer]
  // [END bigquerydatatransfer_datatransferservice_transferconfig_create]
  // [END bigquerydatatransfer_v1_datatransferservice_transferconfig_create]

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

    String sourceCloudStorageUri = System.getenv("DATASOURCE_URI");
    if (args.length > 2) {
      sourceCloudStorageUri = args[2];
    }
    if (sourceCloudStorageUri == null || sourceCloudStorageUri.isEmpty()) {
      sourceCloudStorageUri = "gs://example-bucket/example-data.csv";
    }

    String destinationDatasetId = System.getenv("DATASET_ID");
    if (args.length > 3) {
      destinationDatasetId = args[3];
    }
    if (destinationDatasetId == null || destinationDatasetId.isEmpty()) {
      destinationDatasetId = "example_dataset";
    }

    String destinationTableName = System.getenv("TABLE_ID");
    if (args.length > 4) {
      destinationTableName = args[4];
    }
    if (destinationTableName == null || destinationTableName.isEmpty()) {
      destinationTableName = "example_table";
    }

    String serviceAccount = System.getenv("SERVICE_ACCOUNT_EMAIL");
    if (args.length > 5) {
      serviceAccount = args[5];
    }

    createTransferConfig(
        projectId,
        location,
        sourceCloudStorageUri,
        destinationDatasetId,
        destinationTableName,
        serviceAccount);
  }
}
