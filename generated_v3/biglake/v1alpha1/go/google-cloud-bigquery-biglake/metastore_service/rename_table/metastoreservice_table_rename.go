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

// [START analyticshub_v1alpha1_metastoreservice_rename_table]

import (
	"context"
	"fmt"
	"io"
	"os"

	analyticshub "cloud.google.com/go/bigquery/biglake/apiv1alpha1"
	"cloud.google.com/go/bigquery/biglake/apiv1alpha1/biglakepb"
)

// renameTable renames an existing BigLake table.
func renameTable(ctx context.Context, w io.Writer, locationID string, catalogID string, databaseID string, tableID string) error {
	projectIDOrNumber := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectIDOrNumber == "" {
		projectIDOrNumber = "example-project-id"
	}
	name := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/databases/%s/tables/%s", projectIDOrNumber, locationID, catalogID, databaseID, tableID)
	newName := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/databases/%s/tables/%s", projectIDOrNumber, locationID, catalogID, databaseID, "example-new-table")

	client, err := analyticshub.NewMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetastoreClient failed: %w", err)
	}
	defer client.Close()

	req := &biglakepb.RenameTableRequest{
		Name:    name,
		NewName: newName,
	}

	table, err := client.RenameTable(ctx, req)
	if err != nil {
		return fmt.Errorf("RenameTable: %w", err)
	}

	fmt.Fprintf(w, "Renamed table: %s\n", table.GetName())
	return nil
}

// [END analyticshub_v1alpha1_metastoreservice_rename_table]
