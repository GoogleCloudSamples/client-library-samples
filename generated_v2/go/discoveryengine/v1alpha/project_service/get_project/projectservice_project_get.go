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

// [START discoveryengine_v1alpha_projectservice_project_get]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1alpha"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1alpha/discoveryenginepb"
)

// getProject retrieves metadata for a Discovery Engine project.
func getProject(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s", projectID)

	client, err := discoveryengine.NewProjectClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProjectClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.GetProjectRequest{
		Name: name,
	}

	res, err := client.GetProject(ctx, req)
	if err != nil {
		return fmt.Errorf("GetProject failed: %w", err)
	}

	fmt.Fprintf(w, "Project name: %s\n", res.GetName())
	return nil
}

// [END discoveryengine_v1alpha_projectservice_project_get]
