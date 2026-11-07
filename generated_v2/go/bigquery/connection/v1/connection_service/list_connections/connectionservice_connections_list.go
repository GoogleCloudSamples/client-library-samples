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

// [START bigqueryconnection_v1_connectionservice_connections_list]

import (
	"context"
	"fmt"
	"io"

	bigqueryconnection "cloud.google.com/go/bigquery/connection/apiv1"
	"cloud.google.com/go/bigquery/connection/apiv1/connectionpb"
	"google.golang.org/api/iterator"
)

// listConnections lists BigQuery connections in a specified project and location.
func listConnections(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	var pageSize int32 = 10

	client, err := bigqueryconnection.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &connectionpb.ListConnectionsRequest{
		Parent:   parent,
		PageSize: pageSize,
	}

	it := client.ListConnections(ctx, req)
	for {
		conn, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate connections: %w", err)
		}
		fmt.Fprintf(w, "Connection: %s\n", conn.GetName())
	}

	return nil
}

// [END bigqueryconnection_v1_connectionservice_connections_list]
