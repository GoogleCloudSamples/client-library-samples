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

// [START datamigration_v1_datamigrationservice_privateconnections_list]

import (
	"context"
	"fmt"
	"io"

	datamigration "cloud.google.com/go/clouddms/apiv1"
	datamigrationpb "cloud.google.com/go/clouddms/apiv1/clouddmspb"
	"google.golang.org/api/iterator"
)

// listPrivateConnections lists the private connections in a specified location.
func listPrivateConnections(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := datamigration.NewDataMigrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataMigrationClient failed: %w", err)
	}
	defer client.Close()

	req := &datamigrationpb.ListPrivateConnectionsRequest{
		Parent: parent,
	}

	it := client.ListPrivateConnections(ctx, req)
	for {
		connection, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate private connections: %w", err)
		}

		fmt.Fprintf(w, "Private connection: %s (state: %s)\n", connection.GetName(), connection.GetState())
	}

	return nil
}

// [END datamigration_v1_datamigrationservice_privateconnections_list]
