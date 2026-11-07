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

// [START dataflow_v1beta3_templatesservice_jobfromtemplate_create]

import (
	"context"
	"fmt"
	"io"

	dataflow "cloud.google.com/go/dataflow/apiv1beta3"
	dataflowpb "cloud.google.com/go/dataflow/apiv1beta3/dataflowpb"
)

// createJobFromTemplate launches a Dataflow job using a classic Cloud Storage template.
func createJobFromTemplate(ctx context.Context, w io.Writer, projectID string, locationID string, jobName string, gcsPath string) error {
	client, err := dataflow.NewTemplatesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTemplatesClient: %w", err)
	}
	defer client.Close()

	req := &dataflowpb.CreateJobFromTemplateRequest{
		ProjectId: projectID,
		Location:  locationID,
		JobName:   jobName,
		Template: &dataflowpb.CreateJobFromTemplateRequest_GcsPath{
			GcsPath: gcsPath,
		},
		Parameters: map[string]string{
			"inputFile": "gs://apache-beam-samples/shakespeare/kinglear.txt",
			"output":    "gs://example-bucket/output",
		},
	}

	job, err := client.CreateJobFromTemplate(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateJobFromTemplate: %w", err)
	}

	fmt.Fprintf(w, "Created job: %s\nJob ID: %s\nState: %s\n", job.GetName(), job.GetId(), job.GetCurrentState())
	return nil
}

// [END dataflow_v1beta3_templatesservice_jobfromtemplate_create]
