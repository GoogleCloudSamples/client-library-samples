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

// [START analyticshub_v1_metastoreservice_table_create]

import (
	"context"
	"fmt"
	"io"
	"os"

	biglake "cloud.google.com/go/bigquery/biglake/apiv1"
	"cloud.google.com/go/bigquery/biglake/apiv1/biglakepb"
)

// createTable creates a BigLake table in a database.
func createTable(ctx context.Context, w io.Writer, locationID string, catalogID string, databaseID string, tableID string) error {
	projectIDOrNumber := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectIDOrNumber == "" {
		projectIDOrNumber = "example-project-id"
	}
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/databases/%s", projectIDOrNumber, locationID, catalogID, databaseID)

	storageDescriptor := &biglakepb.HiveTableOptions_StorageDescriptor{
		LocationUri: "gs://example-bucket/example-table",
	}
	hiveOptions := &biglakepb.HiveTableOptions{
		StorageDescriptor: storageDescriptor,
	}
	table := &biglakepb.Table{
		Type: biglakepb.Table_HIVE,
		Options: &biglakepb.Table_HiveOptions{
			HiveOptions: hiveOptions,
		},
	}

	client, err := biglake.NewMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("biglake.NewMetastoreClient: %w", err)
	}
	defer client.Close()

	req := &biglakepb.CreateTableRequest{
		Parent:  parent,
		TableId: tableID,
		Table:   table,
	}

	resp, err := client.CreateTable(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTable: %w", err)
	}

	fmt.Fprintf(w, "Created table: %s\n", resp.GetName())
	return nil
}

// [END analyticshub_v1_metastoreservice_table_create]
