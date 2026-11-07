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

// [START gsuiteaddons_v1_gsuiteaddons_replace_deployment]

import (
	"context"
	"fmt"
	"io"

	gsuiteaddons "cloud.google.com/go/gsuiteaddons/apiv1"
	"cloud.google.com/go/gsuiteaddons/apiv1/gsuiteaddonspb"
)

// Use the ReplaceDeployment method.
func replaceDeployment(ctx context.Context, w io.Writer, projectID string, deploymentID string) error {
	client, err := gsuiteaddons.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s/deployments/%s", projectID, deploymentID)

	// Retrieve the existing deployment to preserve required fields and its etag.
	existing, err := client.GetDeployment(ctx, &gsuiteaddonspb.GetDeploymentRequest{
		Name: name,
	})
	if err != nil {
		return fmt.Errorf("GetDeployment: %w", err)
	}

	deployment := &gsuiteaddonspb.Deployment{
		Name:   name,
		Etag:   existing.GetEtag(),
		AddOns: existing.GetAddOns(),
		OauthScopes: []string{
			"https://www.googleapis.com/auth/calendar.addons.execute",
		},
	}

	req := &gsuiteaddonspb.ReplaceDeploymentRequest{
		Deployment: deployment,
	}

	resp, err := client.ReplaceDeployment(ctx, req)
	if err != nil {
		return fmt.Errorf("ReplaceDeployment: %w", err)
	}

	fmt.Fprintf(w, "Replaced deployment: %s\n", resp.GetName())
	return nil
}

// [END gsuiteaddons_v1_gsuiteaddons_replace_deployment]
