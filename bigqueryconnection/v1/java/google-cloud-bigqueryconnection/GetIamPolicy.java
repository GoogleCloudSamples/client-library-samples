// [START bigqueryconnection_v1_connectionservice_iampolicy_get]
// [START bigqueryconnection_connectionservice_iampolicy_get]
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.NotFoundException;
import com.google.cloud.bigquery.connection.v1.ConnectionName;
import com.google.cloud.bigqueryconnection.v1.ConnectionServiceClient;
import com.google.iam.v1.Binding;
import com.google.iam.v1.GetIamPolicyRequest;
import com.google.iam.v1.Policy;
import java.io.IOException;

public class GetIamPolicy {

  /**
   * Retrieves the IAM policy of a specified BigQuery connection.
   *
   * @param projectId The Google Cloud project ID (for example, "example-project-id").
   * @param location The geographic location of the connection (for example, "us-central1").
   * @param connectionId The ID of the connection (for example, "example-connection-id").
   */
  public static void getIamPolicy(
      String projectId, String location, String connectionId) {
    ConnectionName resource = ConnectionName.of(projectId, location, connectionId);

    GetIamPolicyRequest request =
        GetIamPolicyRequest.newBuilder().setResource(resource.toString()).build();

    try (ConnectionServiceClient client = ConnectionServiceClient.create()) {
      Policy policy = client.getIamPolicy(request);

      System.out.printf("Successfully retrieved IAM policy for connection: %s%n", resource);
      if (policy.getBindingsList().isEmpty()) {
        System.out.println("Policy is empty and has no bindings.");
      }

      for (Binding binding : policy.getBindingsList()) {
        System.out.printf("Role: %s%n", binding.getRole());
        System.out.println("Members:");
        for (String member : binding.getMembersList()) {
          System.out.printf("  - %s%n", member);
        }
      }
    } catch (NotFoundException err) {
      System.err.printf(
          "error: connection '%s' not found in location '%s' for project '%s': %s%n",
          connectionId, location, projectId, err.getMessage());
    } catch (ApiException | IOException err) {
      System.err.printf(
          "error: failed to get IAM policy for connection '%s' in location '%s' for project '%s': %s%n",
          connectionId, location, projectId, err.getMessage());
    }
  }

  // [END bigqueryconnection_connectionservice_iampolicy_get]
  // [END bigqueryconnection_v1_connectionservice_iampolicy_get]

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

    getIamPolicy(projectId, location, connectionId);
  }
}
