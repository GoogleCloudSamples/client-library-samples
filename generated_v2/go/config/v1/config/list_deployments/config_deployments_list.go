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

// [START infra-manager_v1_config_deployments_list]
import (
	"context"
	"fmt"
	"io"

	config "cloud.google.com/go/config/apiv1"
	configpb "cloud.google.com/go/config/apiv1/configpb"
	"google.golang.org/api/iterator"
)

// listDeployments lists Infrastructure Manager deployments in a specified project and location.
func listDeployments(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := config.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("config.NewClient: %w", err)
	}
	defer client.Close()

	req := &configpb.ListDeploymentsRequest{
		Parent: parent,
	}

	it := client.ListDeployments(ctx, req)
	for {
		deployment, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListDeployments: %w", err)
		}
		fmt.Fprintf(w, "Deployment: %s\n", deployment.GetName())
	}

	return nil
}

// [END infra-manager_v1_config_deployments_list]
