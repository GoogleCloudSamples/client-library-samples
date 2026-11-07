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

// [START storagetransfer_v1_storagetransferservice_agentpools_list]

import (
	"context"
	"fmt"
	"io"

	storagetransfer "cloud.google.com/go/storagetransfer/apiv1"
	"cloud.google.com/go/storagetransfer/apiv1/storagetransferpb"
	"google.golang.org/api/iterator"
)

// listAgentPools lists the storage transfer agent pools in a project.
func listAgentPools(ctx context.Context, w io.Writer, projectID string) error {
	client, err := storagetransfer.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &storagetransferpb.ListAgentPoolsRequest{
		ProjectId: projectID,
	}

	it := client.ListAgentPools(ctx, req)
	for {
		pool, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListAgentPools.Next: %w", err)
		}
		fmt.Fprintf(w, "Agent pool: %s\n", pool.GetName())
	}

	return nil
}

// [END storagetransfer_v1_storagetransferservice_agentpools_list]
