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

// [START cloudresourcemanager_v3_projects_project_get]

import (
	"context"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
)

// getProject retrieves project metadata using the GetProject method.
func getProject(ctx context.Context, w io.Writer, projectID string) error {
	name := fmt.Sprintf("projects/%s", projectID)

	client, err := cloudresourcemanager.NewProjectsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProjectsClient failed: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.GetProjectRequest{
		Name: name,
	}

	project, err := client.GetProject(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetProject failed: %w", err)
	}

	fmt.Fprintf(w, "Project: %s\n", project.GetName())
	fmt.Fprintf(w, "Display Name: %s\n", project.GetDisplayName())
	fmt.Fprintf(w, "State: %s\n", project.GetState())

	return nil
}

// [END cloudresourcemanager_v3_projects_project_get]
