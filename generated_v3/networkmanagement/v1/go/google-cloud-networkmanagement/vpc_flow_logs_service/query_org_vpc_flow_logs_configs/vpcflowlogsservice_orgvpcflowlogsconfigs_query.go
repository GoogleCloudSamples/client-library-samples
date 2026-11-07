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

// [START networkmanagement_v1_vpcflowlogsservice_query_org_vpc_flow_logs_configs]

import (
	"context"
	"errors"
	"fmt"
	"io"

	networkmanagement "cloud.google.com/go/networkmanagement/apiv1"
	networkmanagementpb "cloud.google.com/go/networkmanagement/apiv1/networkmanagementpb"
	"google.golang.org/api/iterator"
)

// queryOrgVpcFlowLogsConfigs queries organization VPC Flow Logs configurations.
func queryOrgVpcFlowLogsConfigs(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := networkmanagement.NewVpcFlowLogsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewVpcFlowLogsClient failed: %w", err)
	}
	defer client.Close()

	req := &networkmanagementpb.QueryOrgVpcFlowLogsConfigsRequest{
		Parent: parent,
	}

	it := client.QueryOrgVpcFlowLogsConfigs(ctx, req)
	count := 0
	for {
		config, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate VPC Flow Logs configs: %w", err)
		}
		fmt.Fprintf(w, "- Configuration: %s\n", config.GetName())
		count++
	}
	fmt.Fprintf(w, "Total configurations found: %d\n", count)

	return nil
}

// [END networkmanagement_v1_vpcflowlogsservice_query_org_vpc_flow_logs_configs]
