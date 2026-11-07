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

// [START retail_v2alpha_catalogservice_set_default_branch]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2alpha"
	"cloud.google.com/go/retail/apiv2alpha/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// setDefaultBranch sets the default branch for a catalog.
func setDefaultBranch(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string, branchID string) error {
	catalog := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)

	client, err := retail.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("retail.NewCatalogClient: %w", err)
	}
	defer client.Close()

	req := &retailpb.SetDefaultBranchRequest{
		Catalog:  catalog,
		BranchId: branchID,
	}

	if err := client.SetDefaultBranch(ctx, req); err != nil {
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "Default branch successfully set to %s for catalog %s\n", branchID, catalog)
			return nil
		}
		return fmt.Errorf("SetDefaultBranch: %w", err)
	}

	fmt.Fprintf(w, "Default branch successfully set to %s for catalog %s\n", branchID, catalog)
	return nil
}

// [END retail_v2alpha_catalogservice_set_default_branch]
