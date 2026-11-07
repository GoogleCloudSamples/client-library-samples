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

// [START biglake_v1_metastoreservice_database_delete]

import (
	"context"
	"fmt"
	"io"

	biglake "cloud.google.com/go/bigquery/biglake/apiv1"
	biglakepb "cloud.google.com/go/bigquery/biglake/apiv1/biglakepb"
)

// deleteDatabase deletes a database from a BigLake catalog.
func deleteDatabase(ctx context.Context, w io.Writer, locationID string, catalogID string, databaseID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/databases/%s", projectID, locationID, catalogID, databaseID)

	client, err := biglake.NewMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetastoreClient failed: %w", err)
	}
	defer client.Close()

	req := &biglakepb.DeleteDatabaseRequest{
		Name: name,
	}

	deletedDatabase, err := client.DeleteDatabase(ctx, req)
	if err != nil {
		return fmt.Errorf("client.DeleteDatabase failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted database: %s\n", deletedDatabase.GetName())

	return nil
}

// [END biglake_v1_metastoreservice_database_delete]
