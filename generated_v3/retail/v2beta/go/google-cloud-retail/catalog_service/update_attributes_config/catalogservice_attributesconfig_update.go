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

// [START retail_v2beta_catalogservice_attributesconfig_update]

import (
	"context"
	"fmt"
	"io"
	"strings"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/api/option"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateAttributesConfig updates the attributes configuration of a retail catalog.
func updateAttributesConfig(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	var opts []option.ClientOption
	if locationID != "global" && locationID != "" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-retail.googleapis.com:443", locationID)))
	}

	client, err := retail.NewCatalogClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewCatalogClient: %w", err)
	}
	defer client.Close()

	attributesConfig := &retailpb.AttributesConfig{
		Name: fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/attributesConfig", projectID, locationID, catalogID),
		CatalogAttributes: map[string]*retailpb.CatalogAttribute{
			"attributes.custom_attribute": {
				Key:                    "attributes.custom_attribute",
				SearchableOption:       retailpb.CatalogAttribute_SEARCHABLE_ENABLED,
				IndexableOption:        retailpb.CatalogAttribute_INDEXABLE_ENABLED,
				DynamicFacetableOption: retailpb.CatalogAttribute_DYNAMIC_FACETABLE_ENABLED,
			},
		},
	}

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"catalog_attributes"},
	}

	req := &retailpb.UpdateAttributesConfigRequest{
		AttributesConfig: attributesConfig,
		UpdateMask:       updateMask,
	}

	resp, err := client.UpdateAttributesConfig(ctx, req)
	if err != nil {
		// Cloud Retail requires a one-time terms acceptance in the Google Cloud console.
		if s, ok := status.FromError(err); ok && s.Code() == codes.FailedPrecondition && strings.Contains(err.Error(), "Retail data use terms") {
			fmt.Fprintf(w, "Cloud Retail data use terms must be accepted in the Google Cloud console for project: %s\n", projectID)
			return nil
		}
		return fmt.Errorf("UpdateAttributesConfig: %w", err)
	}

	fmt.Fprintf(w, "Updated attributes config: %s\n", resp.GetName())
	return nil
}

// [END retail_v2beta_catalogservice_attributesconfig_update]
