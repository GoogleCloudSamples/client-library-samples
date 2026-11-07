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

// [START run_v2_workerpools_iampolicy_get]

import (
	"context"
	"fmt"
	"io"

	iampb "cloud.google.com/go/iam/apiv1/iampb"
	run "cloud.google.com/go/run/apiv2"
)

// getIamPolicy retrieves the IAM policy for the specified worker pool.
func getIamPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, workerPoolID string) error {
	resource := fmt.Sprintf("projects/%s/locations/%s/workerPools/%s", projectID, locationID, workerPoolID)

	client, err := run.NewWorkerPoolsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewWorkerPoolsClient failed: %w", err)
	}
	defer client.Close()

	req := &iampb.GetIamPolicyRequest{
		Resource: resource,
	}

	policy, err := client.GetIamPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("GetIamPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved IAM policy for %s with %d binding(s)\n", resource, len(policy.GetBindings()))
	return nil
}

// [END run_v2_workerpools_iampolicy_get]
