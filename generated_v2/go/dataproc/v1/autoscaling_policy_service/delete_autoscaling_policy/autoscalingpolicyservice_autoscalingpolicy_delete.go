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

// [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_delete]
import (
	"context"
	"fmt"
	"io"

	dataproc "cloud.google.com/go/dataproc/v2/apiv1"
	"cloud.google.com/go/dataproc/v2/apiv1/dataprocpb"
	"google.golang.org/api/option"
)

// deleteAutoscalingPolicy deletes a Dataproc autoscaling policy.
func deleteAutoscalingPolicy(ctx context.Context, w io.Writer, projectID string, regionID string, policyID string) error {
	if regionID == "" {
		regionID = "us-central1"
	}

	name := fmt.Sprintf("projects/%s/regions/%s/autoscalingPolicies/%s", projectID, regionID, policyID)

	endpoint := fmt.Sprintf("%s-dataproc.googleapis.com:443", regionID)
	if regionID == "global" {
		endpoint = "dataproc.googleapis.com:443"
	}

	client, err := dataproc.NewAutoscalingPolicyClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewAutoscalingPolicyClient: %w", err)
	}
	defer client.Close()

	req := &dataprocpb.DeleteAutoscalingPolicyRequest{
		Name: name,
	}

	if err := client.DeleteAutoscalingPolicy(ctx, req); err != nil {
		return fmt.Errorf("DeleteAutoscalingPolicy: %w", err)
	}

	fmt.Fprintf(w, "Deleted autoscaling policy: %s\n", name)
	return nil
}

// [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_delete]
