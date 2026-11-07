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

// [START monitoring_v2_alertpolicyservice_alertpolicy_get]

import (
	"context"
	"fmt"
	"io"

	monitoring "cloud.google.com/go/monitoring/apiv3/v2"
	monitoringpb "cloud.google.com/go/monitoring/apiv3/v2/monitoringpb"
)

// Use the GetAlertPolicy method.
func getAlertPolicy(ctx context.Context, w io.Writer, alertPolicyID string, projectID string) error {
	name := fmt.Sprintf("projects/%s/alertPolicies/%s", projectID, alertPolicyID)

	client, err := monitoring.NewAlertPolicyClient(ctx)
	if err != nil {
		return fmt.Errorf("NewAlertPolicyClient failed: %w", err)
	}
	defer client.Close()

	req := &monitoringpb.GetAlertPolicyRequest{
		Name: name,
	}

	policy, err := client.GetAlertPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("GetAlertPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved alert policy: %s (%s)\n", policy.GetName(), policy.GetDisplayName())
	return nil
}

// [END monitoring_v2_alertpolicyservice_alertpolicy_get]
