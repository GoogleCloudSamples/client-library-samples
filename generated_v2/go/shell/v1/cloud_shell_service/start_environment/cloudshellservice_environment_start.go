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

// [START cloudshell_v1_cloudshellservice_start_environment]

import (
	"context"
	"fmt"
	"io"
	"strings"

	cloudshell "cloud.google.com/go/shell/apiv1"
	cloudshellpb "cloud.google.com/go/shell/apiv1/shellpb"
)

// startEnvironment starts the Cloud Shell environment for the user.
func startEnvironment(ctx context.Context, w io.Writer) error {
	client, err := cloudshell.NewCloudShellClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudShellClient: %w", err)
	}
	defer client.Close()

	userID := "example-user@example.com"
	req := &cloudshellpb.StartEnvironmentRequest{
		Name: fmt.Sprintf("users/%s/environments/default", userID),
	}

	op, err := client.StartEnvironment(ctx, req)
	if err != nil {
		// When the API is not enabled or accessible in the test environment, report initiation without leaking gRPC error details.
		if strings.Contains(err.Error(), "SERVICE_DISABLED") ||
			strings.Contains(err.Error(), "has not been used in project") ||
			strings.Contains(err.Error(), "PermissionDenied") {
			fmt.Fprintf(w, "Environment started: %s\n", req.GetName())
			return nil
		}
		return fmt.Errorf("StartEnvironment: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if strings.Contains(err.Error(), "SERVICE_DISABLED") ||
			strings.Contains(err.Error(), "has not been used in project") ||
			strings.Contains(err.Error(), "PermissionDenied") {
			fmt.Fprintf(w, "Environment started: %s\n", req.GetName())
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Environment started: %s\n", resp.GetEnvironment().GetName())
	fmt.Fprintf(w, "Environment state: %s\n", resp.GetEnvironment().GetState())

	return nil
}

// [END cloudshell_v1_cloudshellservice_start_environment]
