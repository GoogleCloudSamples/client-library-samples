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

// [START clouddeploy_v1_clouddeploy_deploypolicy_create]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	deploypb "cloud.google.com/go/deploy/apiv1/deploypb"
	"google.golang.org/genproto/googleapis/type/dayofweek"
	"google.golang.org/genproto/googleapis/type/timeofday"
)

// createDeployPolicy creates a deploy policy that restricts rollouts.
func createDeployPolicy(ctx context.Context, w io.Writer, projectID string, deployPolicyID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	window := &deploypb.WeeklyWindow{
		DaysOfWeek: []dayofweek.DayOfWeek{dayofweek.DayOfWeek_FRIDAY},
		StartTime:  &timeofday.TimeOfDay{Hours: 18},
		EndTime:    &timeofday.TimeOfDay{Hours: 23, Minutes: 59},
	}

	restriction := &deploypb.RolloutRestriction{
		Id: "block-rollout-rule",
		TimeWindows: &deploypb.TimeWindows{
			TimeZone:      "America/New_York",
			WeeklyWindows: []*deploypb.WeeklyWindow{window},
		},
	}

	policyRule := &deploypb.PolicyRule{
		Rule: &deploypb.PolicyRule_RolloutRestriction{
			RolloutRestriction: restriction,
		},
	}

	selector := &deploypb.DeployPolicyResourceSelector{
		DeliveryPipeline: &deploypb.DeliveryPipelineAttribute{
			Id: "*",
		},
	}

	deployPolicy := &deploypb.DeployPolicy{
		Description: "Restricts rollouts on Friday evenings",
		Selectors:   []*deploypb.DeployPolicyResourceSelector{selector},
		Rules:       []*deploypb.PolicyRule{policyRule},
	}

	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient failed: %w", err)
	}
	defer client.Close()

	req := &deploypb.CreateDeployPolicyRequest{
		Parent:         parent,
		DeployPolicyId: deployPolicyID,
		DeployPolicy:   deployPolicy,
	}

	op, err := client.CreateDeployPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("failed to create deploy policy: %w", err)
	}

	policy, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("failed to wait for deploy policy creation: %w", err)
	}

	fmt.Fprintf(w, "Created deploy policy: %s\n", policy.GetName())
	return nil
}

// [END clouddeploy_v1_clouddeploy_deploypolicy_create]
