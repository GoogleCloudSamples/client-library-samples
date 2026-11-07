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

// [START monitoring_v2_alertpolicyservice_alertpolicy_create]

import (
	"context"
	"fmt"
	"io"
	"time"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	"cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
	"google.golang.org/protobuf/types/known/durationpb"
)

// createAlertPolicy creates an alert policy in the specified project.
func createAlertPolicy(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s", projectID)

	condition := &monitoringpb.AlertPolicy_Condition{
		DisplayName: "High CPU Utilization",
		Condition: &monitoringpb.AlertPolicy_Condition_ConditionThreshold{
			ConditionThreshold: &monitoringpb.AlertPolicy_Condition_MetricThreshold{
				Filter:         `resource.type = "gce_instance" AND metric.type = "compute.googleapis.com/instance/cpu/utilization"`,
				Comparison:     monitoringpb.ComparisonType_COMPARISON_GT,
				ThresholdValue: 0.8,
				Duration:       durationpb.New(5 * time.Minute),
			},
		},
	}

	alertPolicy := &monitoringpb.AlertPolicy{
		DisplayName: "Example CPU Utilization Policy",
		Combiner:    monitoringpb.AlertPolicy_AND,
		Conditions: []*monitoringpb.AlertPolicy_Condition{
			condition,
		},
	}

	client, err := monitoring.NewAlertPolicyClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAlertPolicyClient: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.CreateAlertPolicyRequest{
		Name:        name,
		AlertPolicy: alertPolicy,
	}

	resp, err := client.CreateAlertPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateAlertPolicy: %w", err)
	}

	fmt.Fprintf(w, "Created alert policy: %s\n", resp.GetName())
	return nil
}

// [END monitoring_v2_alertpolicyservice_alertpolicy_create]
