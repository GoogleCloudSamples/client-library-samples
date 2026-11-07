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

// [START dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_create]

import (
	"context"
	"fmt"
	"io"

	dataproc "cloud.google.com/go/dataproc/v2/apiv1"
	dataprocpb "cloud.google.com/go/dataproc/v2/apiv1/dataprocpb"
	"google.golang.org/api/option"
	"google.golang.org/protobuf/types/known/durationpb"
)

// createAutoscalingPolicy creates an autoscaling policy in the specified project and location.
func createAutoscalingPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, autoscalingPolicyID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	yarnConfig := &dataprocpb.BasicYarnAutoscalingConfig{
		GracefulDecommissionTimeout: &durationpb.Duration{
			Seconds: 3600,
		},
		ScaleUpFactor:   1.0,
		ScaleDownFactor: 1.0,
	}

	basicAlgorithm := &dataprocpb.BasicAutoscalingAlgorithm{
		Config: &dataprocpb.BasicAutoscalingAlgorithm_YarnConfig{
			YarnConfig: yarnConfig,
		},
	}

	workerConfig := &dataprocpb.InstanceGroupAutoscalingPolicyConfig{
		MinInstances: 2,
		MaxInstances: 10,
	}

	policy := &dataprocpb.AutoscalingPolicy{
		Id: autoscalingPolicyID,
		Algorithm: &dataprocpb.AutoscalingPolicy_BasicAlgorithm{
			BasicAlgorithm: basicAlgorithm,
		},
		WorkerConfig: workerConfig,
	}

	endpoint := fmt.Sprintf("%s-dataproc.googleapis.com:443", locationID)
	client, err := dataproc.NewAutoscalingPolicyClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewAutoscalingPolicyClient: %w", err)
	}
	defer client.Close()

	req := &dataprocpb.CreateAutoscalingPolicyRequest{
		Parent: parent,
		Policy: policy,
	}

	resp, err := client.CreateAutoscalingPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateAutoscalingPolicy: %w", err)
	}

	fmt.Fprintf(w, "Created autoscaling policy: %s\n", resp.GetName())
	return nil
}

// [END dataproc_v1_autoscalingpolicyservice_autoscalingpolicy_create]
