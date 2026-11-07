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

// [START retail_v2alpha_catalogservice_catalogs_list]

import (
	"context"
	"fmt"
	"io"
	"strings"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// listCatalogs retrieves catalogs for a given project and location.
func listCatalogs(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := retail.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.ListCatalogsRequest{
		Parent: parent,
	}

	it := client.ListCatalogs(ctx, req)
	for {
		catalog, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			if status.Code(err) == codes.FailedPrecondition || strings.Contains(err.Error(), "Retail data use terms") {
				fmt.Fprintln(w, "Cloud Retail data use terms must be accepted in the Google Cloud console.")
				return nil
			}
			return fmt.Errorf("CatalogIterator.Next failed: %w", err)
		}
		fmt.Fprintf(w, "Catalog Name: %s\n", catalog.GetName())
		fmt.Fprintf(w, "Display Name: %s\n", catalog.GetDisplayName())
	}

	return nil
}

// [END retail_v2alpha_catalogservice_catalogs_list]
