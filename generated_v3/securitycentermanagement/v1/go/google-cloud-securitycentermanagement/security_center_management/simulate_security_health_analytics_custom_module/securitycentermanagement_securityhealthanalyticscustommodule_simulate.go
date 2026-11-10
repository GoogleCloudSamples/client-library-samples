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

// [START securitycentermanagement_v1_securitycentermanagement_simulate_security_health_analytics_custom_module]

import (
	"context"
	"fmt"
	"io"

	securitycentermanagement "cloud.google.com/go/securitycentermanagement/apiv1"
	"cloud.google.com/go/securitycentermanagement/apiv1/securitycentermanagementpb"
	"google.golang.org/genproto/googleapis/type/expr"
	"google.golang.org/protobuf/types/known/structpb"
)

// simulateSecurityHealthAnalyticsCustomModule evaluates a custom module configuration against a simulated resource.
func simulateSecurityHealthAnalyticsCustomModule(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	customConfig := &securitycentermanagementpb.CustomConfig{
		Predicate: &expr.Expr{
			Expression: "resource.sizeGb > 200",
		},
		ResourceSelector: &securitycentermanagementpb.CustomConfig_ResourceSelector{
			ResourceTypes: []string{"compute.googleapis.com/Disk"},
		},
		Severity:       securitycentermanagementpb.CustomConfig_HIGH,
		Recommendation: "Verify whether disk size adheres to organizational capacity guidelines.",
	}

	resourceData, err := structpb.NewStruct(map[string]any{
		"sizeGb": "300",
	})
	if err != nil {
		return fmt.Errorf("structpb.NewStruct: %w", err)
	}

	resource := &securitycentermanagementpb.SimulateSecurityHealthAnalyticsCustomModuleRequest_SimulatedResource{
		ResourceType: "compute.googleapis.com/Disk",
		ResourceData: resourceData,
	}

	client, err := securitycentermanagement.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &securitycentermanagementpb.SimulateSecurityHealthAnalyticsCustomModuleRequest{
		Parent:       parent,
		CustomConfig: customConfig,
		Resource:     resource,
	}

	resp, err := client.SimulateSecurityHealthAnalyticsCustomModule(ctx, req)
	if err != nil {
		return fmt.Errorf("SimulateSecurityHealthAnalyticsCustomModule: %w", err)
	}

	fmt.Fprintf(w, "Simulation completed. Result: %v\n", resp.GetResult())
	return nil
}

// [END securitycentermanagement_v1_securitycentermanagement_simulate_security_health_analytics_custom_module]
