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

// [START networkmanagement_v1_vpcflowlogsservice_vpcflowlogsconfig_create]

import (
	"context"
	"fmt"
	"io"

	networkmanagement "cloud.google.com/go/networkmanagement/apiv1"
	"cloud.google.com/go/networkmanagement/apiv1/networkmanagementpb"
)

// createVpcFlowLogsConfig creates a new VPC Flow Logs configuration.
func createVpcFlowLogsConfig(ctx context.Context, w io.Writer, projectID string, vpcFlowLogsConfigID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	filterExpr := fmt.Sprintf("src_instance.vm_name == %q", vpcFlowLogsConfigID)
	vpcFlowLogsConfig := &networkmanagementpb.VpcFlowLogsConfig{
		TargetResource: &networkmanagementpb.VpcFlowLogsConfig_Network{
			Network: fmt.Sprintf("projects/%s/global/networks/default", projectID),
		},
		FilterExpr: &filterExpr,
		State:      networkmanagementpb.VpcFlowLogsConfig_ENABLED.Enum(),
	}

	client, err := networkmanagement.NewVpcFlowLogsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewVpcFlowLogsClient failed: %w", err)
	}
	defer client.Close()

	req := &networkmanagementpb.CreateVpcFlowLogsConfigRequest{
		Parent:              parent,
		VpcFlowLogsConfigId: vpcFlowLogsConfigID,
		VpcFlowLogsConfig:   vpcFlowLogsConfig,
	}

	op, err := client.CreateVpcFlowLogsConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateVpcFlowLogsConfig failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created VPC Flow Logs configuration: %s\n", resp.GetName())
	return nil
}

// [END networkmanagement_v1_vpcflowlogsservice_vpcflowlogsconfig_create]
