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

// [START dataproc_v1_workflowtemplateservice_workflowtemplates_list]

import (
	"context"
	"fmt"
	"io"

	dataproc "cloud.google.com/go/dataproc/v2/apiv1"
	"cloud.google.com/go/dataproc/v2/apiv1/dataprocpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listWorkflowTemplates retrieves and prints workflow templates in a project and region.
func listWorkflowTemplates(ctx context.Context, w io.Writer, projectID string, regionID string) error {
	parent := fmt.Sprintf("projects/%s/regions/%s", projectID, regionID)
	endpoint := fmt.Sprintf("%s-dataproc.googleapis.com:443", regionID)

	client, err := dataproc.NewWorkflowTemplateClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewWorkflowTemplateClient: %w", err)
	}
	defer client.Close()

	req := &dataprocpb.ListWorkflowTemplatesRequest{
		Parent: parent,
	}

	it := client.ListWorkflowTemplates(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListWorkflowTemplates: %w", err)
		}

		fmt.Fprintf(w, "Workflow template: %s (ID: %s)\n", resp.GetName(), resp.GetId())
	}

	return nil
}

// [END dataproc_v1_workflowtemplateservice_workflowtemplates_list]
