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

// [START biglake_v1alpha1_metastoreservice_databases_list]

import (
	"context"
	"fmt"
	"io"

	biglake "cloud.google.com/go/bigquery/biglake/apiv1alpha1"
	"cloud.google.com/go/bigquery/biglake/apiv1alpha1/biglakepb"
	"google.golang.org/api/iterator"
)

// listDatabases lists BigLake databases in a catalog.
func listDatabases(ctx context.Context, w io.Writer, locationID string, catalogID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)

	client, err := biglake.NewMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetastoreClient failed: %w", err)
	}
	defer client.Close()

	req := &biglakepb.ListDatabasesRequest{
		Parent: parent,
	}

	it := client.ListDatabases(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListDatabases failed: %w", err)
		}
		fmt.Fprintf(w, "Database: %s\n", resp.GetName())
	}

	return nil
}

// [END biglake_v1alpha1_metastoreservice_databases_list]
