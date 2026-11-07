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

// [START cloudresourcemanager_v3_projects_projects_search]

import (
	"context"
	"errors"
	"fmt"
	"io"
	"os"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// searchProjects searches for projects matching a specified query.
func searchProjects(ctx context.Context, w io.Writer) error {
	var opts []option.ClientOption
	if projectID := os.Getenv("GOOGLE_CLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	} else if projectID := os.Getenv("PROJECT_ID"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	} else if projectID := os.Getenv("GCLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := cloudresourcemanager.NewProjectsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewProjectsClient failed: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.SearchProjectsRequest{
		Query: "state:ACTIVE",
	}

	it := client.SearchProjects(ctx, req)
	for {
		project, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate projects: %w", err)
		}
		fmt.Fprintf(w, "Project: %s (%s)\n", project.GetDisplayName(), project.GetProjectId())
	}

	return nil
}

// [END cloudresourcemanager_v3_projects_projects_search]
