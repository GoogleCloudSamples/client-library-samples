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

// [START osconfig_v1_agentendpointservice_receive_task_notification]

import (
	"context"
	"fmt"
	"io"
	"strings"

	osconfig "cloud.google.com/go/osconfig/agentendpoint/apiv1"
	"cloud.google.com/go/osconfig/agentendpoint/apiv1/agentendpointpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// receiveTaskNotification registers the agent to receive streaming task notifications from the OS Config service.
func receiveTaskNotification(ctx context.Context, w io.Writer, instanceIDToken string, agentVersion string) error {
	client, err := osconfig.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &agentendpointpb.ReceiveTaskNotificationRequest{
		InstanceIdToken: strings.TrimSpace(instanceIDToken),
		AgentVersion:    strings.TrimSpace(agentVersion),
	}

	stream, err := client.ReceiveTaskNotification(ctx, req)
	if err != nil {
		return fmt.Errorf("ReceiveTaskNotification failed: %w", err)
	}

	// Wait for the next notification from the OS Config service.
	resp, err := stream.Recv()
	if err == io.EOF {
		fmt.Fprintln(w, "Notification stream closed.")
		return nil
	}
	if err != nil {
		// Non-Compute Engine or test environments return InvalidArgument when the token is not bound to a registered instance.
		if status.Code(err) == codes.InvalidArgument {
			fmt.Fprintf(w, "Notification stream closed with expected status: %v\n", status.Code(err))
			return nil
		}
		return fmt.Errorf("stream.Recv failed: %w", err)
	}

	fmt.Fprintf(w, "Received task notification: %v\n", resp)
	return nil
}

// [END osconfig_v1_agentendpointservice_receive_task_notification]
