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

// [START biglake_v1_metastoreservice_catalog_get]

import (
	"context"
	"fmt"
	"io"

	biglake "cloud.google.com/go/bigquery/biglake/apiv1"
	biglakepb "cloud.google.com/go/bigquery/biglake/apiv1/biglakepb"
)

// getCatalog retrieves an existing BigLake catalog.
func getCatalog(ctx context.Context, w io.Writer, locationID string, catalogID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)

	client, err := biglake.NewMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetastoreClient failed: %w", err)
	}
	defer client.Close()

	req := &biglakepb.GetCatalogRequest{
		Name: name,
	}

	catalog, err := client.GetCatalog(ctx, req)
	if err != nil {
		return fmt.Errorf("GetCatalog: %w", err)
	}

	fmt.Fprintf(w, "Retrieved catalog: %s\n", catalog.GetName())

	return nil
}

// [END biglake_v1_metastoreservice_catalog_get]
