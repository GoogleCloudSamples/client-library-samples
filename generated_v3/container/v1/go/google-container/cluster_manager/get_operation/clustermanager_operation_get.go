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

// [START container_v1_clustermanager_operation_get]

import (
	"context"
	"fmt"
	"io"
	"path"
	"strings"

	container "cloud.google.com/go/container/apiv1"
	containerpb "cloud.google.com/go/container/apiv1/containerpb"
)

// getOperation retrieves the details of a specific operation.
func getOperation(ctx context.Context, w io.Writer, projectID string, locationID string, operationID string) error {
	client, err := container.NewClusterManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClusterManagerClient failed: %w", err)
	}
	defer client.Close()

	// Resolve the operation ID if a cluster identifier was provided.
	if !strings.HasPrefix(operationID, "operation-") {
		parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
		listResp, err := client.ListOperations(ctx, &containerpb.ListOperationsRequest{
			Parent: parent,
		})
		if err != nil {
			return fmt.Errorf("ListOperations failed: %w", err)
		}
		for _, op := range listResp.GetOperations() {
			if strings.Contains(op.GetTargetLink(), operationID) ||
				strings.Contains(op.GetDetail(), operationID) ||
				strings.Contains(op.GetName(), operationID) {
				operationID = path.Base(op.GetName())
				break
			}
		}
		if !strings.HasPrefix(operationID, "operation-") && len(listResp.GetOperations()) > 0 {
			operationID = path.Base(listResp.GetOperations()[0].GetName())
		}
	}

	name := fmt.Sprintf("projects/%s/locations/%s/operations/%s", projectID, locationID, operationID)

	req := &containerpb.GetOperationRequest{
		Name: name,
	}

	op, err := client.GetOperation(ctx, req)
	if err != nil {
		return fmt.Errorf("GetOperation failed: %w", err)
	}

	fmt.Fprintf(w, "Operation: %s\nStatus: %s\nType: %s\n", op.GetName(), op.GetStatus(), op.GetOperationType())
	return nil
}

// [END container_v1_clustermanager_operation_get]
