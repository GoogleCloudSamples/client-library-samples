// [START bigqueryconnection_v1_connectionservice_connection_create]
// [START bigqueryconnection_connectionservice_connection_create]
import com.google.api.gax.rpc.AlreadyExistsException;
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.bigquery.connection.v1.CloudResourceProperties;
import com.google.cloud.bigquery.connection.v1.Connection;
import com.google.cloud.bigquery.connection.v1.CreateConnectionRequest;
import com.google.cloud.bigquery.connection.v1.LocationName;
import com.google.cloud.bigqueryconnection.v1.ConnectionServiceClient;
import java.io.IOException;

public class CreateConnection {

  /**
   * Creates a BigQuery connection to a Cloud Resource. A Cloud Resource connection provisions a
   * service account that can be granted access to other Google Cloud resources for federated
   * queries.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the connection (for example, "us-central1").
   * @param connectionId The ID of the connection to create (for example, "example-connection-id").
   */
  public static void createConnection(String projectId, String location, String connectionId) {
    LocationName parent = LocationName.of(projectId, location);

    // CloudResourceProperties provisions a managed Google Cloud service account on creation.
    CloudResourceProperties cloudResourceProperties = CloudResourceProperties.newBuilder().build();
    Connection connection =
        Connection.newBuilder()
            .setFriendlyName("Example Connection")
            .setDescription("Cloud Resource connection for federated queries.")
            .setCloudResource(cloudResourceProperties)
            .build();

    CreateConnectionRequest request =
        CreateConnectionRequest.newBuilder()
            .setParent(parent.toString())
            .setConnectionId(connectionId)
            .setConnection(connection)
            .build();

    try (ConnectionServiceClient client = ConnectionServiceClient.create()) {
      Connection response = client.createConnection(request);

      System.out.printf("Successfully created connection: %s%n", response.getName());
      System.out.printf("Friendly name: %s%n", response.getFriendlyName());
      System.out.printf(
          "Service Account: %s%n", response.getCloudResource().getServiceAccountId());
    } catch (AlreadyExistsException err) {
      System.err.printf(
          "error: connection '%s' already exists in location '%s' for project '%s': %s%n",
          connectionId, location, projectId, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to create connection '%s' in location '%s' for project '%s': %s%n",
          connectionId, location, projectId, err.getMessage());
    }
  }

  // [END bigqueryconnection_connectionservice_connection_create]
  // [END bigqueryconnection_v1_connectionservice_connection_create]

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

    createConnection(projectId, location, connectionId);
  }
}
