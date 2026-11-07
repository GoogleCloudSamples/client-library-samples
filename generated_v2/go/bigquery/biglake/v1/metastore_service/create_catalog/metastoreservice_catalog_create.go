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

// [START biglake_v1_metastoreservice_catalog_create]

import (
	"context"
	"fmt"
	"io"

	biglake "cloud.google.com/go/bigquery/biglake/apiv1"
	biglakepb "cloud.google.com/go/bigquery/biglake/apiv1/biglakepb"
)

// createCatalog creates a new BigLake catalog in the specified project and location.
func createCatalog(ctx context.Context, w io.Writer, locationID string, catalogID string, projectID string) error {
	catalog := &biglakepb.Catalog{}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := biglake.NewMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetastoreClient failed: %w", err)
	}
	defer client.Close()

	req := &biglakepb.CreateCatalogRequest{
		Parent:    parent,
		CatalogId: catalogID,
		Catalog:   catalog,
	}

	resp, err := client.CreateCatalog(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateCatalog failed: %w", err)
	}

	fmt.Fprintf(w, "Created catalog: %s\n", resp.GetName())
	return nil
}

// [END biglake_v1_metastoreservice_catalog_create]
