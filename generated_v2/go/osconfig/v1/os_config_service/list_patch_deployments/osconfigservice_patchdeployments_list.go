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

// [START osconfig_v1_osconfigservice_patchdeployments_list]

import (
	"context"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/apiv1"
	osconfigpb "cloud.google.com/go/osconfig/apiv1/osconfigpb"
	"google.golang.org/api/iterator"
)

// listPatchDeployments lists the patch deployments in an example project.
func listPatchDeployments(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := osconfig.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("osconfig.NewClient: %w", err)
	}
	defer client.Close()

	req := &osconfigpb.ListPatchDeploymentsRequest{
		Parent: parent,
	}

	it := client.ListPatchDeployments(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate patch deployments: %w", err)
		}
		fmt.Fprintf(w, "Patch deployment: %s\n", resp.GetName())
	}

	return nil
}

// [END osconfig_v1_osconfigservice_patchdeployments_list]
