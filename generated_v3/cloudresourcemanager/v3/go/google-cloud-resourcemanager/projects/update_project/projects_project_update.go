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

// [START cloudresourcemanager_v3_projects_project_update]

import (
	"context"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateProject updates an existing Google Cloud project's display name.
func updateProject(ctx context.Context, w io.Writer, project string) error {
	client, err := cloudresourcemanager.NewProjectsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewProjectsClient failed: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.UpdateProjectRequest{
		Project: &resourcemanagerpb.Project{
			Name:        fmt.Sprintf("projects/%s", project),
			DisplayName: "Updated Project Display Name",
		},
		UpdateMask: &fieldmaskpb.FieldMask{
			Paths: []string{"display_name"},
		},
	}

	op, err := client.UpdateProject(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateProject: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated project: %s\n", resp.GetName())
	return nil
}

// [END cloudresourcemanager_v3_projects_project_update]
