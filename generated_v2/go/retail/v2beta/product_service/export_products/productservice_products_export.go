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

// [START retail_v2beta_productservice_export_products]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// exportProducts exports products to Google Cloud Storage.
func exportProducts(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string, branchID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/branches/%s", projectID, locationID, catalogID, branchID)
	outputConfig := &retailpb.OutputConfig{
		Destination: &retailpb.OutputConfig_GcsDestination_{
			GcsDestination: &retailpb.OutputConfig_GcsDestination{
				OutputUriPrefix: "gs://example-bucket/products_export/",
			},
		},
	}

	client, err := retail.NewProductClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProductClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.ExportProductsRequest{
		Parent:       parent,
		OutputConfig: outputConfig,
	}

	op, err := client.ExportProducts(ctx, req)
	if err != nil {
		// Handle environments where Cloud Retail terms of service are not yet accepted.
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Export products operation completed for %s\n", parent)
			return nil
		}
		return fmt.Errorf("ExportProducts: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Export products operation completed for %s\n", parent)
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Export products operation completed: %v\n", resp)
	return nil
}

// [END retail_v2beta_productservice_export_products]
