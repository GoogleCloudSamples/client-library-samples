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

// [START bigqueryconnection_v1_connectionservice_connection_get]

import (
	"context"
	"fmt"
	"io"

	bigqueryconnection "cloud.google.com/go/bigquery/connection/apiv1"
	"cloud.google.com/go/bigquery/connection/apiv1/connectionpb"
)

// Use the GetConnection method.
func getConnection(ctx context.Context, w io.Writer, projectID string, locationID string, connectionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/connections/%s", projectID, locationID, connectionID)

	client, err := bigqueryconnection.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &connectionpb.GetConnectionRequest{
		Name: name,
	}

	conn, err := client.GetConnection(ctx, req)
	if err != nil {
		return fmt.Errorf("GetConnection: %w", err)
	}

	fmt.Fprintf(w, "Connection name: %s\n", conn.GetName())

	return nil
}

// [END bigqueryconnection_v1_connectionservice_connection_get]
