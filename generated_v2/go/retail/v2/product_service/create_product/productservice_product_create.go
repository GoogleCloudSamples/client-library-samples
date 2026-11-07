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

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2"
	retailpb "cloud.google.com/go/retail/apiv2/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// [START retail_v2_productservice_product_create]

// createProduct creates a primary product in the default catalog branch.
func createProduct(ctx context.Context, w io.Writer, projectID string, productID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/default_catalog/branches/default_branch", projectID, locationID)
	product := &retailpb.Product{
		Title:      "Nest Cam IQ Outdoor",
		Type:       retailpb.Product_PRIMARY,
		Categories: []string{"Electronics > Security Cameras"},
	}

	client, err := retail.NewProductClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProductClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.CreateProductRequest{
		Parent:    parent,
		Product:   product,
		ProductId: productID,
	}

	resp, err := client.CreateProduct(ctx, req)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Created product: %s/products/%s\n", parent, productID)
			return nil
		}
		return fmt.Errorf("CreateProduct failed: %w", err)
	}

	fmt.Fprintf(w, "Created product: %s\n", resp.GetName())
	return nil
}

// [END retail_v2_productservice_product_create]
