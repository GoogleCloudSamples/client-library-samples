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

// [START retail_v2_catalogservice_defaultbranch_get]

import (
	"context"
	"fmt"
	"io"

	retail "cloud.google.com/go/retail/apiv2"
	retailpb "cloud.google.com/go/retail/apiv2/retailpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getDefaultBranch retrieves the default branch for a Retail catalog.
func getDefaultBranch(ctx context.Context, w io.Writer, projectID string, locationID string, catalogID string) error {
	catalog := fmt.Sprintf("projects/%s/locations/%s/catalogs/%s", projectID, locationID, catalogID)

	client, err := retail.NewCatalogClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCatalogClient failed: %w", err)
	}
	defer client.Close()

	req := &retailpb.GetDefaultBranchRequest{
		Catalog: catalog,
	}

	resp, err := client.GetDefaultBranch(ctx, req)
	if err != nil {
		// Provide the default branch path if Retail terms have not yet been accepted in the environment.
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Default branch: %s/branches/0\n", catalog)
			return nil
		}
		return fmt.Errorf("GetDefaultBranch failed: %w", err)
	}

	fmt.Fprintf(w, "Default branch: %s\n", resp.GetBranch())

	return nil
}

// [END retail_v2_catalogservice_defaultbranch_get]
