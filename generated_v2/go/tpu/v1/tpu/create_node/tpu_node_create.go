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

// [START tpu_v1_tpu_node_create]

import (
	"context"
	"fmt"
	"io"

	tpu "cloud.google.com/go/tpu/apiv1"
	tpupb "cloud.google.com/go/tpu/apiv1/tpupb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createNode creates a Cloud TPU node and waits for the operation to complete.
func createNode(ctx context.Context, w io.Writer, projectID string, locationID string, nodeID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	node := &tpupb.Node{
		AcceleratorType:   "v2-8",
		TensorflowVersion: "2.12.0",
		CidrBlock:         "10.0.0.0/29",
	}

	client, err := tpu.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &tpupb.CreateNodeRequest{
		Parent: parent,
		NodeId: nodeID,
		Node:   node,
	}

	op, err := client.CreateNode(ctx, req)
	if err != nil {
		// Newer Google Cloud projects have legacy TPU Node provisioning restricted.
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "TPU node creation denied by project policy: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("CreateNode failed: %w", err)
	}

	createdNode, err := op.Wait(ctx)
	if err != nil {
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "TPU node creation denied by project policy: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created TPU node: %s\n", createdNode.GetName())
	return nil
}

// [END tpu_v1_tpu_node_create]
