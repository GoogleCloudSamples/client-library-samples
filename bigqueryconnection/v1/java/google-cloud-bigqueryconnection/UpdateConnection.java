// [START bigqueryconnection_v1_connectionservice_connection_update]
// [START bigqueryconnection_connectionservice_connection_update]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.connection.v1.Connection;
import com.google.cloud.bigquery.connection.v1.ConnectionName;
import com.google.cloud.bigquery.connection.v1.UpdateConnectionRequest;
import com.google.cloud.bigqueryconnection.v1.ConnectionServiceClient;
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateConnection {

  /**
   * Updates a BigQuery connection's friendly name and description.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the connection (for example, "us-central1").
   * @param connectionId The ID of the connection to update (for example, "example-connection-id").
   */
  public static void updateConnection(String projectId, String location, String connectionId) {
    ConnectionName name = ConnectionName.of(projectId, location, connectionId);

    Connection connection =
        Connection.newBuilder()
            .setFriendlyName("Example Updated BigQuery Connection")
            .setDescription("Updated description for the connection.")
            .build();

    // Specify only metadata fields in the FieldMask so existing credentials are not reset.
    FieldMask updateMask =
        FieldMask.newBuilder().addPaths("friendly_name").addPaths("description").build();

    UpdateConnectionRequest request =
        UpdateConnectionRequest.newBuilder()
            .setName(name.toString())
            .setConnection(connection)
            .setUpdateMask(updateMask)
            .build();

    try (ConnectionServiceClient client = ConnectionServiceClient.create()) {
      Connection response = client.updateConnection(request);

      System.out.printf("Connection '%s' updated successfully.%n", response.getName());
      System.out.printf("Friendly Name: %s%n", response.getFriendlyName());
      System.out.printf("Description: %s%n", response.getDescription());
    } catch (NotFoundException err) {
      System.err.printf(
          "error: connection '%s' not found in location '%s' for project '%s': %s%n",
          connectionId, location, projectId, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to update connection '%s' in location '%s' for project '%s': %s%n",
          connectionId, location, projectId, err.getMessage());
    }
  }

  // [END bigqueryconnection_connectionservice_connection_update]
  // [END bigqueryconnection_v1_connectionservice_connection_update]

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

    String connectionId = System.getenv("CONNECTION_ID");
    if (args.length > 2) {
      connectionId = args[2];
    }
    if (connectionId == null || connectionId.isEmpty()) {
      connectionId = "example-connection-id";
    }

    updateConnection(projectId, location, connectionId);
  }
}
