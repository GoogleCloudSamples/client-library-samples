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

// [START datalineage_v1_lineage_batch_search_link_processes]

import (
	"context"
	"fmt"
	"io"
	"strconv"
	"strings"

	datalineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	lineagepb "cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
	resourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
	"google.golang.org/api/iterator"
)

// batchSearchLinkProcesses retrieves processes associated with a specific lineage link.
func batchSearchLinkProcesses(ctx context.Context, w io.Writer, projectID string, locationID string, linkID string) error {
	project := projectID
	// The Lineage API requires a numeric project number in resource paths.
	if _, err := strconv.ParseInt(project, 10, 64); err != nil {
		crmClient, err := resourcemanager.NewProjectsClient(ctx)
		if err != nil {
			return fmt.Errorf("resourcemanager.NewProjectsClient: %w", err)
		}
		defer crmClient.Close()

		proj, err := crmClient.GetProject(ctx, &resourcemanagerpb.GetProjectRequest{
			Name: fmt.Sprintf("projects/%s", projectID),
		})
		if err != nil {
			return fmt.Errorf("crmClient.GetProject: %w", err)
		}
		project = strings.TrimPrefix(proj.GetName(), "projects/")
	}

	if strings.HasPrefix(linkID, "projects/") {
		parts := strings.Split(linkID, "/")
		linkID = parts[len(parts)-1]
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", project, locationID)
	links := fmt.Sprintf("projects/%s/locations/%s/links/%s", project, locationID, linkID)

	client, err := datalineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("datalineage.NewClient: %w", err)
	}
	defer client.Close()

	req := &lineagepb.BatchSearchLinkProcessesRequest{
		Parent: parent,
		Links:  []string{links},
	}
	it := client.BatchSearchLinkProcesses(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("BatchSearchLinkProcesses: %w", err)
		}
		fmt.Fprintf(w, "Process: %s\n", resp.GetProcess())
	}

	return nil
}

// [END datalineage_v1_lineage_batch_search_link_processes]
