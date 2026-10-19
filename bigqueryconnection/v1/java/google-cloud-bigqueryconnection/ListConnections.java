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

// [START bigqueryconnection_v1_connectionservice_connections_list]
// [START bigqueryconnection_connectionservice_connections_list]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.InvalidArgumentException;
import com.google.cloud.bigquery.connection.v1.Connection;
import com.google.cloud.bigquery.connection.v1.ListConnectionsRequest;
import com.google.cloud.bigquery.connection.v1.LocationName;
import com.google.cloud.bigqueryconnection.v1.ConnectionServiceClient;
import java.io.IOException;

public class ListConnections {

  /**
   * Lists all BigQuery connections in a given project and location.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the connections (for example, "us-central1").
   */
  public static void listConnections(String projectId, String location) {
    LocationName parent = LocationName.of(projectId, location);

    ListConnectionsRequest request =
        ListConnectionsRequest.newBuilder().setParent(parent.toString()).setPageSize(100).build();

    try (ConnectionServiceClient client = ConnectionServiceClient.create()) {
      System.out.printf(
          "Listing connections in project '%s' and location '%s':%n", projectId, location);

      for (Connection connection : client.listConnections(request).iterateAll()) {
        System.out.printf("Connection Name: %s%n", connection.getName());
        System.out.printf("Friendly Name: %s%n", connection.getFriendlyName());
        System.out.printf("Has Credential: %b%n", connection.getHasCredential());
      }

      System.out.println("Finished listing connections.");
    } catch (InvalidArgumentException err) {
      System.err.printf(
          "error: invalid argument listing connections in location '%s' for project '%s': %s%n",
          location, projectId, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to list connections in location '%s' for project '%s': %s%n",
          location, projectId, err.getMessage());
    }
  }

  // [END bigqueryconnection_connectionservice_connections_list]
  // [END bigqueryconnection_v1_connectionservice_connections_list]

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

    listConnections(projectId, location);
  }
}
