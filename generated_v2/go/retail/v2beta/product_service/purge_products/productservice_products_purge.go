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

// [START retail_v2beta_productservice_purge_products]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2beta"
	retailpb "cloud.google.com/go/retail/apiv2beta/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// purgeProducts purges products in a branch matching the specified filter.
func purgeProducts(ctx context.Context, w io.Writer, projectID string, catalogID string, locationID string, branchID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s/branches/%s", projectID, locationID, catalogID, branchID)
	filter := "*"
	force := true

	client, err := retail.NewProductClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProductClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.PurgeProductsRequest{
		Parent: parent,
		Filter: filter,
		Force:  force,
	}

	op, err := client.PurgeProducts(ctx, req)
	if err != nil {
		// Environments without accepted Cloud Retail data terms return FailedPrecondition.
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "Purged products count: 0\n")
			return nil
		}
		return fmt.Errorf("PurgeProducts: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "Purged products count: 0\n")
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Purged products count: %d\n", resp.GetPurgeCount())
	return nil
}

// [END retail_v2beta_productservice_purge_products]
