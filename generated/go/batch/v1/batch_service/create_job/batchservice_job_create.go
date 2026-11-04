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

package snippets

// [START batch_v1_batchservice_job_create]

import (
	"context"
	"fmt"
	"io"

	batch "cloud.google.com/go/batch/apiv1"
	batchpb "cloud.google.com/go/batch/apiv1/batchpb"
)

// createJob creates a new Batch job in the specified project and location.
func createJob(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	runnable := &batchpb.Runnable{
		Executable: &batchpb.Runnable_Script_{
			Script: &batchpb.Runnable_Script{
				Command: &batchpb.Runnable_Script_Text{
					Text: "echo Hello world! This is task ${BATCH_TASK_INDEX}",
				},
			},
		},
	}

	taskSpec := &batchpb.TaskSpec{
		Runnables: []*batchpb.Runnable{runnable},
		ComputeResource: &batchpb.ComputeResource{
			CpuMilli:  2000,
			MemoryMib: 2048,
		},
	}

	taskGroup := &batchpb.TaskGroup{
		TaskCount: 1,
		TaskSpec:  taskSpec,
	}

	job := &batchpb.Job{
		TaskGroups: []*batchpb.TaskGroup{taskGroup},
		LogsPolicy: &batchpb.LogsPolicy{
			Destination: batchpb.LogsPolicy_CLOUD_LOGGING,
		},
	}

	client, err := batch.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("batch.NewClient: %w", err)
	}
	defer client.Close()

	req := &batchpb.CreateJobRequest{
		Parent: parent,
		JobId:  "example-job",
		Job:    job,
	}

	createdJob, err := client.CreateJob(ctx, req)
	if err != nil {
		return fmt.Errorf("client.CreateJob: %w", err)
	}

	fmt.Fprintf(w, "Created job: %s\n", createdJob.GetName())

	return nil
}

// [END batch_v1_batchservice_job_create]
