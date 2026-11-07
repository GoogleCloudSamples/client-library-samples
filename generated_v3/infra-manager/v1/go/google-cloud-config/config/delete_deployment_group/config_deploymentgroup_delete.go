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

// [START infra-manager_v1_config_deploymentgroup_delete]

import (
	"context"
	"fmt"
	"io"

	config "cloud.google.com/go/config/apiv1"
	"cloud.google.com/go/config/apiv1/configpb"
)

// deleteDeploymentGroup deletes a deployment group using Infrastructure Manager.
func deleteDeploymentGroup(ctx context.Context, w io.Writer, projectID string, locationID string, deploymentGroupID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/deploymentGroups/%s", projectID, locationID, deploymentGroupID)

	client, err := config.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &configpb.DeleteDeploymentGroupRequest{
		Name: name,
	}

	op, err := client.DeleteDeploymentGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteDeploymentGroup failed: %w", err)
	}

	// Wait for the long-running operation to complete.
	if _, err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted deployment group: %s\n", name)
	return nil
}

// [END infra-manager_v1_config_deploymentgroup_delete]
