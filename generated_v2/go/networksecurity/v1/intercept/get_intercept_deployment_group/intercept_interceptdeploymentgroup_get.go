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

// [START networksecurity_v1_intercept_interceptdeploymentgroup_get]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// getInterceptDeploymentGroup retrieves an existing InterceptDeploymentGroup resource.
func getInterceptDeploymentGroup(ctx context.Context, w io.Writer, projectID string, locationID string, interceptDeploymentGroupID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/interceptDeploymentGroups/%s", projectID, locationID, interceptDeploymentGroupID)

	client, err := networksecurity.NewInterceptClient(ctx)
	if err != nil {
		return fmt.Errorf("NewInterceptClient failed: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.GetInterceptDeploymentGroupRequest{
		Name: name,
	}

	deploymentGroup, err := client.GetInterceptDeploymentGroup(ctx, req)
	if err != nil {
		return fmt.Errorf("GetInterceptDeploymentGroup failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved Intercept Deployment Group: %s\n", deploymentGroup.GetName())
	return nil
}

// [END networksecurity_v1_intercept_interceptdeploymentgroup_get]
