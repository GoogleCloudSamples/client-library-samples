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

// [START dataproc_v1_workflowtemplateservice_workflowtemplate_create]

import (
	"context"
	"fmt"
	"io"

	dataproc "cloud.google.com/go/dataproc/v2/apiv1"
	"cloud.google.com/go/dataproc/v2/apiv1/dataprocpb"
	"google.golang.org/api/option"
)

// createWorkflowTemplate creates a new Dataproc workflow template in the specified project and location.
func createWorkflowTemplate(ctx context.Context, w io.Writer, projectID string, locationID string, workflowTemplateID string) error {
	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dataproc.googleapis.com:443", locationID)))
	}

	client, err := dataproc.NewWorkflowTemplateClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewWorkflowTemplateClient failed: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	sparkJob := &dataprocpb.SparkJob{
		Driver: &dataprocpb.SparkJob_MainClass{
			MainClass: "org.apache.spark.examples.SparkPi",
		},
		Args: []string{"1000"},
	}

	orderedJob := &dataprocpb.OrderedJob{
		StepId: "example-spark-step",
		JobType: &dataprocpb.OrderedJob_SparkJob{
			SparkJob: sparkJob,
		},
	}

	placement := &dataprocpb.WorkflowTemplatePlacement{
		Placement: &dataprocpb.WorkflowTemplatePlacement_ClusterSelector{
			ClusterSelector: &dataprocpb.ClusterSelector{
				ClusterLabels: map[string]string{
					"example-label": "example-value",
				},
			},
		},
	}

	template := &dataprocpb.WorkflowTemplate{
		Id:        workflowTemplateID,
		Placement: placement,
		Jobs: []*dataprocpb.OrderedJob{
			orderedJob,
		},
	}

	req := &dataprocpb.CreateWorkflowTemplateRequest{
		Parent:   parent,
		Template: template,
	}

	resp, err := client.CreateWorkflowTemplate(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateWorkflowTemplate failed: %w", err)
	}

	fmt.Fprintf(w, "Created workflow template: %s\n", resp.GetName())
	return nil
}

// [END dataproc_v1_workflowtemplateservice_workflowtemplate_create]
