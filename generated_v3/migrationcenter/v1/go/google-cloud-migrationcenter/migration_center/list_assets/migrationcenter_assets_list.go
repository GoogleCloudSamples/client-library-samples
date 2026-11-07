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

// [START migrationcenter_v1_migrationcenter_assets_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
	"google.golang.org/api/iterator"
)

// listAssets lists Migration Center assets in a given project and location.
func listAssets(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("migrationcenter.NewClient: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.ListAssetsRequest{
		Parent: parent,
	}

	it := client.ListAssets(ctx, req)
	var count int
	for {
		asset, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Asset: %s\n", asset.GetName())
		count++
	}

	if count == 0 {
		fmt.Fprintln(w, "No assets found.")
	}

	return nil
}

// [END migrationcenter_v1_migrationcenter_assets_list]
