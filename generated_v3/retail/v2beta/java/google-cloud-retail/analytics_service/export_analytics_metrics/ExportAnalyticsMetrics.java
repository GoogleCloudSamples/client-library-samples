// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.cloud.retail.v2beta;

// [START retail_v2beta_analyticsservice_export_analytics_metrics]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.FailedPreconditionException;
import com.google.cloud.retail.v2beta.AnalyticsServiceClient;
import com.google.cloud.retail.v2beta.ExportAnalyticsMetricsRequest;
import com.google.cloud.retail.v2beta.ExportAnalyticsMetricsResponse;
import com.google.cloud.retail.v2beta.OutputConfig;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class ExportAnalyticsMetrics {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "global";
    String catalogId = "default_catalog";

    if (args.length > 0) {
      projectId = args[0];
    }
    if (args.length > 1) {
      locationId = args[1];
    }
    if (args.length > 2) {
      catalogId = args[2];
    }

    exportAnalyticsMetrics(projectId, locationId, catalogId);
  }

  public static void exportAnalyticsMetrics(String projectId, String locationId, String catalogId)
      throws IOException {
    // Initialize client for sending requests.
    try (AnalyticsServiceClient client = AnalyticsServiceClient.create()) {
      String catalog =
          String.format("projects/%s/locations/%s/catalogs/%s", projectId, locationId, catalogId);

      OutputConfig.GcsDestination gcsDestination =
          OutputConfig.GcsDestination.newBuilder()
              .setOutputUriPrefix("gs://example-bucket/analytics_export/")
              .build();

      OutputConfig outputConfig =
          OutputConfig.newBuilder().setGcsDestination(gcsDestination).build();

      ExportAnalyticsMetricsRequest request =
          ExportAnalyticsMetricsRequest.newBuilder()
              .setCatalog(catalog)
              .setOutputConfig(outputConfig)
              .build();

      // Long-running operation; wait for export operation to complete.
      try {
        ExportAnalyticsMetricsResponse response =
            client.exportAnalyticsMetricsAsync(request).get();

        System.out.printf("Export operation completed: %s%n", response.getOutputResult());
      } catch (ExecutionException e) {
        if (e.getCause() instanceof FailedPreconditionException) {
          System.out.printf(
              "Cloud Retail terms not accepted or service not enabled for %s.%n", projectId);
        } else {
          System.out.printf("Export operation encountered an issue: %s%n", e.getMessage());
        }
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        System.out.println("Export operation interrupted.");
      } catch (FailedPreconditionException e) {
        System.out.printf(
            "Cloud Retail terms not accepted or service not enabled for %s.%n", projectId);
      } catch (ApiException e) {
        System.out.printf("Export operation API error: %s%n", e.getMessage());
      }
    }
  }
}
// [END retail_v2beta_analyticsservice_export_analytics_metrics]
