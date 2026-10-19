// [START bigqueryconnection_v1_connectionservice_connection_delete]
// [START bigqueryconnection_connectionservice_connection_delete]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.connection.v1.ConnectionName;
import com.google.cloud.bigqueryconnection.v1.ConnectionServiceClient;
import java.io.IOException;

public class DeleteConnection {

  /**
   * Deletes a specified BigQuery connection.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the connection (for example, "us-central1").
   * @param connectionId The ID of the connection to delete (for example, "example-connection-id").
   */
  public static void deleteConnection(String projectId, String location, String connectionId) {
    ConnectionName name = ConnectionName.of(projectId, location, connectionId);

    try (ConnectionServiceClient client = ConnectionServiceClient.create()) {
      client.deleteConnection(name);
      System.out.printf("Connection '%s' was deleted.%n", connectionId);
    } catch (NotFoundException err) {
      System.err.printf(
          "error: connection '%s' not found in location '%s' for project '%s': %s%n",
          connectionId, location, projectId, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to delete connection '%s' in location '%s' for project '%s': %s%n",
          connectionId, location, projectId, err.getMessage());
    }
  }

  // [END bigqueryconnection_connectionservice_connection_delete]
  // [END bigqueryconnection_v1_connectionservice_connection_delete]

  public static void main(String[] args) {
    String projectId = System.getenv("GOOGLE_CLOUD_PROJECT");
    if (args.length > 0) {
      projectId = args[0];
    }
    if (projectId == null || projectId.isEmpty()) {
      projectId = "example-project-id";
    }

    String location = System.getenv("GOOGLE_CLOUD_REGION");
    if (args.length > 1) {
      location = args[1];
    }
    if (location == null || location.isEmpty()) {
      location = "us-central1";
    }

    String connectionId = System.getenv("CONNECTION_ID");
    if (args.length > 2) {
      connectionId = args[2];
    }
    if (connectionId == null || connectionId.isEmpty()) {
      connectionId = "example-connection-id";
    }

    deleteConnection(projectId, location, connectionId);
  }
}
