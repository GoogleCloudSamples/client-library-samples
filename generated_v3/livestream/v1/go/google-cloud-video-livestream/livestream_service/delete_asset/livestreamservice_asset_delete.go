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

// [START livestream_v1_livestreamservice_asset_delete]

import (
	"context"
	"fmt"
	"io"

	livestream "cloud.google.com/go/video/livestream/apiv1"
	livestreampb "cloud.google.com/go/video/livestream/apiv1/livestreampb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// deleteAsset deletes an asset resource.
func deleteAsset(ctx context.Context, w io.Writer, projectID string, locationID string, assetID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/assets/%s", projectID, locationID, assetID)

	client, err := livestream.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("livestream.NewClient: %w", err)
	}
	defer client.Close()

	req := &livestreampb.DeleteAssetRequest{
		Name: name,
	}

	op, err := client.DeleteAsset(ctx, req)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Asset not found: %s\n", name)
			return nil
		}
		return fmt.Errorf("client.DeleteAsset: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Asset not found: %s\n", name)
			return nil
		}
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted asset: %s\n", name)

	return nil
}

// [END livestream_v1_livestreamservice_asset_delete]
