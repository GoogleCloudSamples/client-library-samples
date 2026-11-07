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

	retail "cloud.google.com/go/retail/apiv2alpha"
	retailpb "cloud.google.com/go/retail/apiv2alpha/retailpb"
	"google.golang.org/api/option"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// [START retail_v2alpha_productservice_import_products]

// importProducts imports products into a catalog branch using an inline source.
func importProducts(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string, branchID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/branches/%s", projectID, locationID, catalogID, branchID)

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"title"},
	}

	product := &retailpb.Product{
		Id:    "example-product-id",
		Title: "Example Product",
	}

	inlineSource := &retailpb.ProductInlineSource{
		Products: []*retailpb.Product{product},
	}

	inputConfig := &retailpb.ProductInputConfig{
		Source: &retailpb.ProductInputConfig_ProductInlineSource{
			ProductInlineSource: inlineSource,
		},
	}

	var opts []option.ClientOption
	if locationID != "global" && locationID != "" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-retail.googleapis.com:443", locationID)))
	}

	client, err := retail.NewProductClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewProductClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.ImportProductsRequest{
		Parent:      parent,
		InputConfig: inputConfig,
		UpdateMask:  updateMask,
	}

	op, err := client.ImportProducts(ctx, req)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintln(w, "Imported products operation completed.")
			return nil
		}
		return fmt.Errorf("ImportProducts: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintln(w, "Imported products operation completed.")
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Imported products operation completed: %v\n", resp)
	return nil
}

// [END retail_v2alpha_productservice_import_products]
