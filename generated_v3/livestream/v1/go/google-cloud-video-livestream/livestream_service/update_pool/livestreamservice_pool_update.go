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

// [START livestream_v1_livestreamservice_pool_update]

import (
	"context"
	"fmt"
	"io"

	livestream "cloud.google.com/go/video/livestream/apiv1"
	"cloud.google.com/go/video/livestream/apiv1/livestreampb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updatePool updates the network configuration for a Livestream pool.
func updatePool(ctx context.Context, w io.Writer, projectID string, locationID string, poolID string, networkID string) error {
	pool := &livestreampb.Pool{
		Name: fmt.Sprintf("projects/%s/locations/%s/pools/%s", projectID, locationID, poolID),
		NetworkConfig: &livestreampb.Pool_NetworkConfig{
			PeeredNetwork: networkID,
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"network_config"},
	}

	client, err := livestream.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &livestreampb.UpdatePoolRequest{
		Pool:       pool,
		UpdateMask: updateMask,
	}

	op, err := client.UpdatePool(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdatePool failed: %w", err)
	}

	response, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated pool: %s\n", response.GetName())

	return nil
}

// [END livestream_v1_livestreamservice_pool_update]
