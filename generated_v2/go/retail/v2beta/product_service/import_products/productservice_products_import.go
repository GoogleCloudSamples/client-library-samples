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

// [START retail_v2beta_productservice_import_products]

import (
	"context"
	"fmt"
	"io"
	"strings"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// importProducts imports products into a catalog branch using an inline source.
func importProducts(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string, branchID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/branches/%s", projectID, locationID, catalogID, branchID)

	products := []*retailpb.Product{
		{
			Id:         "example-product-id",
			Title:      "Example Product Title",
			Type:       retailpb.Product_PRIMARY,
			Categories: []string{"Apparel"},
		},
	}
	inlineSource := &retailpb.ProductInlineSource{
		Products: products,
	}
	inputConfig := &retailpb.ProductInputConfig{
		Source: &retailpb.ProductInputConfig_ProductInlineSource{
			ProductInlineSource: inlineSource,
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"title"},
	}

	client, err := retail.NewProductClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProductClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.ImportProductsRequest{
		Parent:      parent,
		InputConfig: inputConfig,
		UpdateMask:  updateMask,
	}

	op, err := client.ImportProducts(ctx, req)
	if err != nil {
		// Cloud Retail requires data use terms acceptance in the Google Cloud console before use.
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition && strings.Contains(st.Message(), "Retail") {
			fmt.Fprintf(w, "Cloud Retail data use terms not accepted: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("ImportProducts failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition && strings.Contains(st.Message(), "Retail") {
			fmt.Fprintf(w, "Cloud Retail data use terms not accepted: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("Wait for ImportProducts failed: %w", err)
	}

	fmt.Fprintf(w, "Import products operation completed: %v\n", resp)
	return nil
}

// [END retail_v2beta_productservice_import_products]
