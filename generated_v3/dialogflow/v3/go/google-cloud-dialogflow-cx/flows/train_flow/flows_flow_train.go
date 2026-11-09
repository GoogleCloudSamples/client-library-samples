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

// [START dialogflow_v3_flows_train_flow]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// trainFlow trains the specified flow.
func trainFlow(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, flowID string) error {
	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewFlowsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewFlowsClient failed: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/flows/%s", projectID, locationID, agentID, flowID)

	req := &cxpb.TrainFlowRequest{
		Name: name,
	}

	op, err := client.TrainFlow(ctx, req)
	if err != nil {
		return fmt.Errorf("TrainFlow failed: %w", err)
	}

	// TrainFlow is a long-running operation; wait for it to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Flow trained: %s\n", name)

	return nil
}

// [END dialogflow_v3_flows_train_flow]
