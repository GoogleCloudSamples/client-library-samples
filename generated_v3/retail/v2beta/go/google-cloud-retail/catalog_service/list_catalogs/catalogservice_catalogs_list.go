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

// [START retail_v2beta_catalogservice_catalogs_list]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// listCatalogs lists the catalogs for a given project and location.
func listCatalogs(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := retail.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.ListCatalogsRequest{
		Parent: parent,
	}

	it := client.ListCatalogs(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			// Handle projects that have not yet enabled Cloud Retail or accepted terms.
			if status.Code(err) == codes.FailedPrecondition {
				fmt.Fprintf(w, "Cloud Retail is not enabled or terms are not accepted for project %s\n", projectID)
				return nil
			}
			return fmt.Errorf("ListCatalogs.Next: %w", err)
		}
		fmt.Fprintf(w, "Catalog: %s, Display Name: %s\n", resp.GetName(), resp.GetDisplayName())
	}

	return nil
}

// [END retail_v2beta_catalogservice_catalogs_list]
