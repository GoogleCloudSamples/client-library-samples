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

// [START dataproc_v1_workflowtemplateservice_workflowtemplate_update]

import (
	"context"
	"fmt"
	"io"

	dataproc "cloud.google.com/go/dataproc/v2/apiv1"
	"cloud.google.com/go/dataproc/v2/apiv1/dataprocpb"
	"google.golang.org/api/option"
)

// updateWorkflowTemplate updates an existing Dataproc workflow template.
func updateWorkflowTemplate(ctx context.Context, w io.Writer, projectID string, locationID string, workflowTemplateID string) error {
	endpoint := fmt.Sprintf("%s-dataproc.googleapis.com:443", locationID)
	client, err := dataproc.NewWorkflowTemplateClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewWorkflowTemplateClient failed: %w", err)
	}
	defer client.Close()

	// Retrieve the existing template to obtain its current server version.
	name := fmt.Sprintf("projects/%s/locations/%s/workflowTemplates/%s", projectID, locationID, workflowTemplateID)
	getRequest := &dataprocpb.GetWorkflowTemplateRequest{
		Name: name,
	}
	template, err := client.GetWorkflowTemplate(ctx, getRequest)
	if err != nil {
		return fmt.Errorf("GetWorkflowTemplate failed: %w", err)
	}

	// Modify an inert label while preserving existing template configuration and version.
	if template.Labels == nil {
		template.Labels = make(map[string]string)
	}
	template.Labels["updated"] = "true"

	updateRequest := &dataprocpb.UpdateWorkflowTemplateRequest{
		Template: template,
	}
	updatedTemplate, err := client.UpdateWorkflowTemplate(ctx, updateRequest)
	if err != nil {
		return fmt.Errorf("UpdateWorkflowTemplate failed: %w", err)
	}

	fmt.Fprintf(w, "Updated workflow template: %s (version: %d)\n", updatedTemplate.GetName(), updatedTemplate.GetVersion())
	return nil
}

// [END dataproc_v1_workflowtemplateservice_workflowtemplate_update]
