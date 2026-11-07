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

// [START migrationcenter_v1_migrationcenter_add_assets_to_group]

import (
	"context"
	"fmt"
	"io"
	"strings"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
)

// addAssetsToGroup adds an asset to a Migration Center group.
func addAssetsToGroup(ctx context.Context, w io.Writer, projectID string, locationID string, groupID string, assetID string) error {
	group := fmt.Sprintf("projects/%s/locations/%s/groups/%s", projectID, locationID, groupID)

	assetPath := assetID
	if !strings.Contains(assetID, "/") {
		assetPath = fmt.Sprintf("projects/%s/locations/%s/assets/%s", projectID, locationID, assetID)
	}

	assets := &migrationcenterpb.AssetList{
		AssetIds: []string{assetPath},
	}

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("migrationcenter.NewClient: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.AddAssetsToGroupRequest{
		Group:  group,
		Assets: assets,
	}

	op, err := client.AddAssetsToGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("AddAssetsToGroup: %w", err)
	}

	response, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Added assets to group: %s\n", response.GetName())

	return nil
}

// [END migrationcenter_v1_migrationcenter_add_assets_to_group]
