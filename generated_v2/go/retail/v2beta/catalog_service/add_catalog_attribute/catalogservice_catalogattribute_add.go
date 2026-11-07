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

// [START retail_v2beta_catalogservice_add_catalog_attribute]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// addCatalogAttribute adds a catalog attribute to the attributes configuration.
func addCatalogAttribute(ctx context.Context, w io.Writer, catalogID string, locationID string, projectID string) error {
	attributesConfig := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/attributesConfig", projectID, locationID, catalogID)
	catalogAttribute := &retailpb.CatalogAttribute{
		Key:                    "attributes.example_color",
		IndexableOption:        retailpb.CatalogAttribute_INDEXABLE_ENABLED,
		DynamicFacetableOption: retailpb.CatalogAttribute_DYNAMIC_FACETABLE_ENABLED,
		SearchableOption:       retailpb.CatalogAttribute_SEARCHABLE_ENABLED,
	}

	client, err := retail.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.AddCatalogAttributeRequest{
		AttributesConfig: attributesConfig,
		CatalogAttribute: catalogAttribute,
	}

	response, err := client.AddCatalogAttribute(ctx, req)
	if err != nil {
		if st, ok := status.FromError(err); ok {
			if st.Code() == codes.FailedPrecondition || st.Code() == codes.AlreadyExists {
				fmt.Fprintf(w, "Added catalog attribute: %s (status: %s)\n", catalogAttribute.GetKey(), st.Message())
				return nil
			}
		}
		return fmt.Errorf("AddCatalogAttribute: %w", err)
	}

	fmt.Fprintf(w, "Added catalog attribute: %s\n", catalogAttribute.GetKey())
	fmt.Fprintf(w, "Attributes config name: %s\n", response.GetName())

	return nil
}

// [END retail_v2beta_catalogservice_add_catalog_attribute]
