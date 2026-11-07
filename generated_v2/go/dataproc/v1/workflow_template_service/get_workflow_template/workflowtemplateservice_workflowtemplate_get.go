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

// [START dataproc_v1_workflowtemplateservice_workflowtemplate_get]

import (
	"context"
	"fmt"
	"io"

	dataproc "cloud.google.com/go/dataproc/v2/apiv1"
	dataprocpb "cloud.google.com/go/dataproc/v2/apiv1/dataprocpb"
	"google.golang.org/api/option"
)

// Use the GetWorkflowTemplate method.
func getWorkflowTemplate(ctx context.Context, w io.Writer, projectID string, regionID string, templateID string) error {
	name := fmt.Sprintf("projects/%s/regions/%s/workflowTemplates/%s", projectID, regionID, templateID)

	endpoint := fmt.Sprintf("%s-dataproc.googleapis.com:443", regionID)
	client, err := dataproc.NewWorkflowTemplateClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewWorkflowTemplateClient failed: %w", err)
	}
	defer client.Close()

	req := &dataprocpb.GetWorkflowTemplateRequest{
		Name: name,
	}

	resp, err := client.GetWorkflowTemplate(ctx, req)
	if err != nil {
		return fmt.Errorf("GetWorkflowTemplate failed: %w", err)
	}

	fmt.Fprintf(w, "Workflow template retrieved: %s\n", resp.GetName())

	return nil
}

// [END dataproc_v1_workflowtemplateservice_workflowtemplate_get]
