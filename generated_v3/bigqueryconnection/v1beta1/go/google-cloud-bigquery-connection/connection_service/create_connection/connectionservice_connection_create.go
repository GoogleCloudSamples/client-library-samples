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

package main

// [START bigqueryconnection_v1beta1_connectionservice_connection_create]

import (
	"context"
	"fmt"
	"io"

	bigqueryconnection "cloud.google.com/go/bigquery/connection/apiv1beta1"
	"cloud.google.com/go/bigquery/connection/apiv1beta1/connectionpb"
)

// createConnection creates a new BigQuery connection to an external Cloud SQL data source.
func createConnection(ctx context.Context, w io.Writer, projectID string, locationID string, connectionID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	credential := &connectionpb.CloudSqlCredential{
		Username: "example-user",
		Password: "example-password",
	}
	cloudSQL := &connectionpb.CloudSqlProperties{
		InstanceId: fmt.Sprintf("%s:%s:example-instance", projectID, locationID),
		Database:   "example-db",
		Type:       connectionpb.CloudSqlProperties_POSTGRES,
		Credential: credential,
	}
	connection := &connectionpb.Connection{
		FriendlyName: "Example Connection",
		Description:  "Example Cloud SQL connection",
		Properties: &connectionpb.Connection_CloudSql{
			CloudSql: cloudSQL,
		},
	}

	client, err := bigqueryconnection.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("bigqueryconnection.NewClient: %w", err)
	}
	defer client.Close()

	req := &connectionpb.CreateConnectionRequest{
		Parent:       parent,
		ConnectionId: connectionID,
		Connection:   connection,
	}

	resp, err := client.CreateConnection(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateConnection: %w", err)
	}

	fmt.Fprintf(w, "Created connection: %s\n", resp.GetName())
	return nil
}

// [END bigqueryconnection_v1beta1_connectionservice_connection_create]
