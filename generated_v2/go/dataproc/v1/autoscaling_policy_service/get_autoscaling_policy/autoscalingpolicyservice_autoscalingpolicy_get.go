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

// [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_get]

import (
	"context"
	"fmt"
	"io"

	dataproc "cloud.google.com/go/dataproc/v2/apiv1"
	"cloud.google.com/go/dataproc/v2/apiv1/dataprocpb"
	"google.golang.org/api/option"
)

// getAutoscalingPolicy retrieves an existing autoscaling policy in Google Cloud Dataproc.
func getAutoscalingPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, autoscalingPolicyID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/autoscalingPolicies/%s", projectID, locationID, autoscalingPolicyID)

	endpoint := fmt.Sprintf("%s-dataproc.googleapis.com:443", locationID)
	if locationID == "global" {
		endpoint = "dataproc.googleapis.com:443"
	}

	client, err := dataproc.NewAutoscalingPolicyClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewAutoscalingPolicyClient failed: %w", err)
	}
	defer client.Close()

	req := &dataprocpb.GetAutoscalingPolicyRequest{
		Name: name,
	}

	policy, err := client.GetAutoscalingPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("GetAutoscalingPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved autoscaling policy: %s\n", policy.GetName())
	return nil
}

// [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_get]
