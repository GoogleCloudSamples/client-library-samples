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

// [START dataflow_v1beta3_templatesservice_launch_template]

import (
	"context"
	"fmt"
	"io"

	dataflow "cloud.google.com/go/dataflow/apiv1beta3"
	dataflowpb "cloud.google.com/go/dataflow/apiv1beta3/dataflowpb"
)

// launchTemplate executes a Dataflow template stored in Cloud Storage.
func launchTemplate(ctx context.Context, w io.Writer, projectID string, locationID string, gcsPath string) error {
	client, err := dataflow.NewTemplatesClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTemplatesClient failed: %w", err)
	}
	defer client.Close()

	launchParameters := &dataflowpb.LaunchTemplateParameters{
		JobName: "example-template-job",
		Parameters: map[string]string{
			"inputFile": "gs://dataflow-samples/shakespeare/kinglear.txt",
			"output":    "gs://example-bucket/output",
		},
	}

	req := &dataflowpb.LaunchTemplateRequest{
		ProjectId: projectID,
		Location:  locationID,
		Template: &dataflowpb.LaunchTemplateRequest_GcsPath{
			GcsPath: gcsPath,
		},
		LaunchParameters: launchParameters,
	}

	resp, err := client.LaunchTemplate(ctx, req)
	if err != nil {
		return fmt.Errorf("LaunchTemplate failed: %w", err)
	}

	fmt.Fprintf(w, "Launched Dataflow job ID: %s\n", resp.GetJob().GetId())
	return nil
}

// [END dataflow_v1beta3_templatesservice_launch_template]
