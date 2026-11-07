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

// [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_update]

import (
	"context"
	"fmt"
	"io"

	dataproc "cloud.google.com/go/dataproc/v2/apiv1"
	dataprocspb "cloud.google.com/go/dataproc/v2/apiv1/dataprocpb"
	"google.golang.org/api/option"
)

// updateAutoscalingPolicy updates an existing Dataproc autoscaling policy.
func updateAutoscalingPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, autoscalingPolicyID string) error {
	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dataproc.googleapis.com:443", locationID)))
	}

	client, err := dataproc.NewAutoscalingPolicyClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewAutoscalingPolicyClient failed: %w", err)
	}
	defer client.Close()

	policyName := fmt.Sprintf("projects/%s/locations/%s/autoscalingPolicies/%s", projectID, locationID, autoscalingPolicyID)

	// Retrieve the existing policy because UpdateAutoscalingPolicy performs a full replacement.
	policy, err := client.GetAutoscalingPolicy(ctx, &dataprocspb.GetAutoscalingPolicyRequest{
		Name: policyName,
	})
	if err != nil {
		return fmt.Errorf("GetAutoscalingPolicy failed: %w", err)
	}

	// Update mutable fields while preserving existing configuration.
	policy.Name = policyName
	policy.Id = autoscalingPolicyID
	if policy.WorkerConfig != nil {
		policy.WorkerConfig.MaxInstances = 10
	}
	if policy.Labels == nil {
		policy.Labels = make(map[string]string)
	}
	policy.Labels["status"] = "updated"

	req := &dataprocspb.UpdateAutoscalingPolicyRequest{
		Policy: policy,
	}

	updatedPolicy, err := client.UpdateAutoscalingPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateAutoscalingPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Updated autoscaling policy: %s\n", updatedPolicy.GetName())
	return nil
}

// [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_update]
