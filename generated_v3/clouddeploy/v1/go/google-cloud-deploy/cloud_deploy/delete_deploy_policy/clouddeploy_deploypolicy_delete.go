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

// [START clouddeploy_v1_clouddeploy_deploypolicy_delete]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	deploypb "cloud.google.com/go/deploy/apiv1/deploypb"
)

// deleteDeployPolicy deletes an existing deploy policy.
func deleteDeployPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, deployPolicyID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/deployPolicies/%s", projectID, locationID, deployPolicyID)

	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient failed: %w", err)
	}
	defer client.Close()

	req := &deploypb.DeleteDeployPolicyRequest{
		Name: name,
	}

	op, err := client.DeleteDeployPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteDeployPolicy failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted deploy policy: %s\n", name)

	return nil
}

// [END clouddeploy_v1_clouddeploy_deploypolicy_delete]
