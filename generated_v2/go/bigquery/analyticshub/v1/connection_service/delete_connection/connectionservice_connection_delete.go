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

// [START analyticshub_v1_connectionservice_connection_delete]

import (
	"context"
	"fmt"
	"io"

	connection "cloud.google.com/go/bigquery/connection/apiv1"
	"cloud.google.com/go/bigquery/connection/apiv1/connectionpb"
)

// deleteConnection deletes a BigQuery connection.
func deleteConnection(ctx context.Context, w io.Writer, projectID string, locationID string, connectionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/connections/%s", projectID, locationID, connectionID)

	client, err := connection.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("connection.NewClient: %w", err)
	}
	defer client.Close()

	req := &connectionpb.DeleteConnectionRequest{
		Name: name,
	}

	if err := client.DeleteConnection(ctx, req); err != nil {
		return fmt.Errorf("client.DeleteConnection: %w", err)
	}

	fmt.Fprintf(w, "Deleted connection: %s\n", name)
	return nil
}

// [END analyticshub_v1_connectionservice_connection_delete]
