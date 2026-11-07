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

// [START retail_v2beta_catalogservice_batch_remove_catalog_attributes]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// batchRemoveCatalogAttributes removes specified catalog attributes from an attributes configuration.
func batchRemoveCatalogAttributes(ctx context.Context, w io.Writer, locationID string, catalogID string, projectID string) error {
	attributesConfig := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/attributesConfig", projectID, locationID, catalogID)
	attributeKeys := []string{"example-attribute-key"}

	client, err := retail.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("retail.NewCatalogClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.BatchRemoveCatalogAttributesRequest{
		AttributesConfig: attributesConfig,
		AttributeKeys:    attributeKeys,
	}

	resp, err := client.BatchRemoveCatalogAttributes(ctx, req)
	if err != nil {
		// Handle environments where Cloud Retail is not enabled or terms have not been accepted.
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "Cloud Retail terms not accepted or service not enabled: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("client.BatchRemoveCatalogAttributes: %w", err)
	}

	fmt.Fprintf(w, "Deleted catalog attributes: %v\n", resp.GetDeletedCatalogAttributes())
	fmt.Fprintf(w, "Reset catalog attributes: %v\n", resp.GetResetCatalogAttributes())

	return nil
}

// [END retail_v2beta_catalogservice_batch_remove_catalog_attributes]
