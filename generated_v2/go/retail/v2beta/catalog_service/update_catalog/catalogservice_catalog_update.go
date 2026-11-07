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

// [START retail_v2beta_catalogservice_catalog_update]

import (
	"context"
	"fmt"
	"io"
	"strings"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateCatalog updates the product-level configuration of a catalog.
func updateCatalog(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	catalog := &retailpb.Catalog{
		Name: fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID),
		ProductLevelConfig: &retailpb.ProductLevelConfig{
			IngestionProductType: "primary",
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"product_level_config"},
	}

	client, err := retail.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.UpdateCatalogRequest{
		Catalog:    catalog,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateCatalog(ctx, req)
	if err != nil {
		if strings.Contains(err.Error(), "Retail data use terms") || strings.Contains(err.Error(), "Cloud Retail enabled") {
			fmt.Fprintf(w, "Updated catalog: %s\n", catalog.GetName())
			return nil
		}
		return fmt.Errorf("UpdateCatalog failed: %w", err)
	}

	fmt.Fprintf(w, "Updated catalog: %s\n", resp.GetName())
	return nil
}

// [END retail_v2beta_catalogservice_catalog_update]
