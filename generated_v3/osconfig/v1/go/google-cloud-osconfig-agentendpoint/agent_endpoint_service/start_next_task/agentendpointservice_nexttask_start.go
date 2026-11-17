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

// [START osconfig_v1_agentendpointservice_start_next_task]

import (
	"context"
	"fmt"
	"io"

	osconfig "cloud.google.com/go/osconfig/agentendpoint/apiv1"
	"cloud.google.com/go/osconfig/agentendpoint/apiv1/agentendpointpb"
	"google.golang.org/api/option"
)

// startNextTask signals that the guest agent is ready to execute tasks and retrieves the next task.
func startNextTask(ctx context.Context, w io.Writer, instanceIDToken string) error {
	// AgentEndpointService authenticates using the instance identity token in
	// each request payload rather than standard Application Default Credentials.
	client, err := osconfig.NewClient(ctx, option.WithoutAuthentication())
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &agentendpointpb.StartNextTaskRequest{
		InstanceIdToken: instanceIDToken,
	}

	resp, err := client.StartNextTask(ctx, req)
	if err != nil {
		return fmt.Errorf("StartNextTask: %w", err)
	}

	task := resp.GetTask()
	if task == nil {
		fmt.Fprintln(w, "No tasks pending for the instance.")
		return nil
	}

	fmt.Fprintf(w, "Retrieved task ID: %s (Type: %s)\n", task.GetTaskId(), task.GetTaskType())
	return nil
}

// [END osconfig_v1_agentendpointservice_start_next_task]
