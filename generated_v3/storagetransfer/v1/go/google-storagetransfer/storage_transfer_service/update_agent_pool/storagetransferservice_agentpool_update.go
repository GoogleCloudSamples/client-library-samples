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

// [START storagetransfer_v1_storagetransferservice_agentpool_update]

import (
	"context"
	"fmt"
	"io"

	storagetransfer "cloud.google.com/go/storagetransfer/apiv1"
	storagetransferpb "cloud.google.com/go/storagetransfer/apiv1/storagetransferpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateAgentPool updates the display name of an existing agent pool.
func updateAgentPool(ctx context.Context, w io.Writer, projectID string, agentPoolID string) error {
	agentPool := &storagetransferpb.AgentPool{
		Name:        fmt.Sprintf("projects/%s/agentPools/%s", projectID, agentPoolID),
		DisplayName: "Updated Agent Pool",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	client, err := storagetransfer.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("storagetransfer.NewClient: %w", err)
	}
	defer client.Close()

	req := &storagetransferpb.UpdateAgentPoolRequest{
		AgentPool:  agentPool,
		UpdateMask: updateMask,
	}

	res, err := client.UpdateAgentPool(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateAgentPool: %w", err)
	}

	fmt.Fprintf(w, "Updated agent pool: %s\n", res.GetName())
	return nil
}

// [END storagetransfer_v1_storagetransferservice_agentpool_update]
