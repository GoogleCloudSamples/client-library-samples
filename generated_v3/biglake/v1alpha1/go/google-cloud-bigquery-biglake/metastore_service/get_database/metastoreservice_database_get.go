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

// [START analyticshub_v1alpha1_metastoreservice_database_get]

import (
	"context"
	"fmt"
	"io"
	"os"

	biglake "cloud.google.com/go/bigquery/biglake/apiv1alpha1"
	"cloud.google.com/go/bigquery/biglake/apiv1alpha1/biglakepb"
)

// getDatabase retrieves metadata for a BigLake database.
func getDatabase(ctx context.Context, w io.Writer, locationID string, catalogID string, databaseID string) error {
	projectIDOrNumber := "example-project-id"
	if envProject := os.Getenv("GOOGLE_CLOUD_PROJECT"); envProject != "" {
		projectIDOrNumber = envProject
	}
	name := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/databases/%s", projectIDOrNumber, locationID, catalogID, databaseID)

	client, err := biglake.NewMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetastoreClient: %w", err)
	}
	defer client.Close()

	req := &biglakepb.GetDatabaseRequest{
		Name: name,
	}

	resp, err := client.GetDatabase(ctx, req)
	if err != nil {
		return fmt.Errorf("GetDatabase: %w", err)
	}

	fmt.Fprintf(w, "Retrieved database: %s\n", resp.GetName())
	return nil
}

// [END analyticshub_v1alpha1_metastoreservice_database_get]
