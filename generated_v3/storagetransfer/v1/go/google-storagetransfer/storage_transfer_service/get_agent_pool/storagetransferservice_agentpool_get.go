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

// [START storagetransfer_v1_storagetransferservice_agentpool_get]

import (
	"context"
	"fmt"
	"io"

	storagetransfer "cloud.google.com/go/storagetransfer/apiv1"
	"cloud.google.com/go/storagetransfer/apiv1/storagetransferpb"
)

// getAgentPool gets the details of an existing agent pool.
func getAgentPool(ctx context.Context, w io.Writer, projectID string, agentPoolID string) error {
	name := fmt.Sprintf("projects/%s/agentPools/%s", projectID, agentPoolID)

	client, err := storagetransfer.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("storagetransfer.NewClient: %w", err)
	}
	defer client.Close()

	req := &storagetransferpb.GetAgentPoolRequest{
		Name: name,
	}

	resp, err := client.GetAgentPool(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetAgentPool: %w", err)
	}

	fmt.Fprintf(w, "Retrieved agent pool: %s\n", resp.GetName())
	fmt.Fprintf(w, "Display name: %s\n", resp.GetDisplayName())
	fmt.Fprintf(w, "State: %s\n", resp.GetState())

	return nil
}

// [END storagetransfer_v1_storagetransferservice_agentpool_get]
