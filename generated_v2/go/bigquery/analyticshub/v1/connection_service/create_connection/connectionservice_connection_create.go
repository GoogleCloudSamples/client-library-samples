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

// [START analyticshub_v1_connectionservice_connection_create]

import (
	"context"
	"fmt"
	"io"

	connection "cloud.google.com/go/bigquery/connection/apiv1"
	"cloud.google.com/go/bigquery/connection/apiv1/connectionpb"
)

// createConnection creates a new BigQuery connection in a given project and location.
func createConnection(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	client, err := connection.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("connection.NewClient: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	connection := &connectionpb.Connection{
		FriendlyName: "Example Connection",
		Description:  "Example BigQuery connection",
		Properties: &connectionpb.Connection_CloudResource{
			CloudResource: &connectionpb.CloudResourceProperties{},
		},
	}

	req := &connectionpb.CreateConnectionRequest{
		Parent:     parent,
		Connection: connection,
	}

	response, err := client.CreateConnection(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateConnection: %w", err)
	}

	fmt.Fprintf(w, "Created connection: %s\n", response.GetName())
	return nil
}

// [END analyticshub_v1_connectionservice_connection_create]
