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

// [START analyticshub_v1alpha1_metastoreservice_catalogs_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	biglake "cloud.google.com/go/bigquery/biglake/apiv1alpha1"
	"cloud.google.com/go/bigquery/biglake/apiv1alpha1/biglakepb"
	"google.golang.org/api/iterator"
)

// listCatalogs lists the catalogs in a given project and location.
func listCatalogs(ctx context.Context, w io.Writer, locationID string) error {
	projectIDOrNumber := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectIDOrNumber == "" {
		projectIDOrNumber = os.Getenv("GCP_PROJECT")
	}
	if projectIDOrNumber == "" {
		projectIDOrNumber = "example-project-id"
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectIDOrNumber, locationID)

	client, err := biglake.NewMetastoreClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetastoreClient failed: %w", err)
	}
	defer client.Close()

	req := &biglakepb.ListCatalogsRequest{
		Parent: parent,
	}

	it := client.ListCatalogs(ctx, req)
	for {
		catalog, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate catalogs: %w", err)
		}
		fmt.Fprintf(w, "Catalog: %s\n", catalog.GetName())
	}

	return nil
}

// [END analyticshub_v1alpha1_metastoreservice_catalogs_list]
