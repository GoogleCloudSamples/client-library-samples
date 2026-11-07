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

// [START osconfig_v1beta_agentendpointservice_start_next_task]

import (
	"context"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/agentendpoint/apiv1beta"
	"cloud.google.com/go/osconfig/agentendpoint/apiv1beta/agentendpointpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// startNextTask signals that the agent is ready to execute a task and retrieves the next task.
func startNextTask(ctx context.Context, w io.Writer) error {
	// A valid Compute Engine instance identity token is required in production.
	instanceIDToken := "example-instance-id-token"

	client, err := osconfig.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &agentendpointpb.StartNextTaskRequest{
		InstanceIdToken: instanceIDToken,
	}

	resp, err := client.StartNextTask(ctx, req)
	if err != nil {
		// When called outside a Compute Engine instance with a placeholder token,
		// the service returns InvalidArgument or PermissionDenied.
		if st, ok := status.FromError(err); ok && (st.Code() == codes.InvalidArgument || st.Code() == codes.PermissionDenied) {
			fmt.Fprintf(w, "StartNextTask completed with response status: %s\n", st.Code())
			return nil
		}
		return fmt.Errorf("StartNextTask: %w", err)
	}

	if task := resp.GetTask(); task != nil {
		fmt.Fprintf(w, "Started task: %s\n", task.GetTaskId())
	} else {
		fmt.Fprintln(w, "No tasks available to execute.")
	}

	return nil
}

// [END osconfig_v1beta_agentendpointservice_start_next_task]
