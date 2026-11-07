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

// [START networkmanagement_v1_vpcflowlogsservice_vpcflowlogsconfig_update]

import (
	"context"
	"fmt"
	"io"

	networkmanagement "cloud.google.com/go/networkmanagement/apiv1"
	"cloud.google.com/go/networkmanagement/apiv1/networkmanagementpb"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateVpcFlowLogsConfig updates an existing VPC Flow Logs configuration.
func updateVpcFlowLogsConfig(ctx context.Context, w io.Writer, projectID string, locationID string, vpcFlowLogsConfigID string) error {
	vpcFlowLogsConfig := &networkmanagementpb.VpcFlowLogsConfig{
		Name:        fmt.Sprintf("projects/%s/locations/%s/vpcFlowLogsConfigs/%s", projectID, locationID, vpcFlowLogsConfigID),
		Description: proto.String("Updated VPC flow logs configuration"),
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := networkmanagement.NewVpcFlowLogsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewVpcFlowLogsClient failed: %w", err)
	}
	defer client.Close()

	req := &networkmanagementpb.UpdateVpcFlowLogsConfigRequest{
		UpdateMask:        updateMask,
		VpcFlowLogsConfig: vpcFlowLogsConfig,
	}

	op, err := client.UpdateVpcFlowLogsConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateVpcFlowLogsConfig failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated VPC flow logs config: %s\n", resp.GetName())
	return nil
}

// [END networkmanagement_v1_vpcflowlogsservice_vpcflowlogsconfig_update]
