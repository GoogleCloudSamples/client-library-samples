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

// [START transcoder_v1_transcoderservice_job_create]

import (
	"context"
	"fmt"
	"io"

	transcoder "cloud.google.com/go/video/transcoder/apiv1"
	transcoderpb "cloud.google.com/go/video/transcoder/apiv1/transcoderpb"
)

// createJob creates a transcoding job using a predefined template.
func createJob(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	job := &transcoderpb.Job{
		InputUri:  "gs://example-bucket/example-input.mp4",
		OutputUri: "gs://example-bucket/example-output/",
		JobConfig: &transcoderpb.Job_TemplateId{
			TemplateId: "preset/web-hd",
		},
	}

	client, err := transcoder.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &transcoderpb.CreateJobRequest{
		Parent: parent,
		Job:    job,
	}

	response, err := client.CreateJob(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateJob failed: %w", err)
	}

	fmt.Fprintf(w, "Created job: %s\n", response.GetName())
	return nil
}

// [END transcoder_v1_transcoderservice_job_create]
