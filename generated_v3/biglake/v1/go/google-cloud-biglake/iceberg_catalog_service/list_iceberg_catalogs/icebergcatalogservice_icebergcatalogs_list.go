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

// [START biglake_v1_icebergcatalogservice_icebergcatalogs_list]

import (
	"context"
	"fmt"
	"io"

	biglake "cloud.google.com/go/biglake/apiv1"
	biglakepb "cloud.google.com/go/biglake/apiv1/biglakepb"
	"google.golang.org/api/iterator"
)

// listIcebergCatalogs lists Iceberg catalogs in the specified project.
func listIcebergCatalogs(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := biglake.NewIcebergCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewIcebergCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &biglakepb.ListIcebergCatalogsRequest{
		Parent: parent,
	}

	it := client.ListIcebergCatalogs(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate Iceberg catalogs: %w", err)
		}
		fmt.Fprintf(w, "Iceberg catalog: %s\n", resp.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No Iceberg catalogs found.")
	}

	return nil
}

// [END biglake_v1_icebergcatalogservice_icebergcatalogs_list]
