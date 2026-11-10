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

// [START cloudshell_v1_cloudshellservice_environment_get]

import (
	"context"
	"fmt"
	"io"

	cloudshell "cloud.google.com/go/shell/apiv1"
	cloudshellpb "cloud.google.com/go/shell/apiv1/shellpb"
)

// getEnvironment retrieves the specified Cloud Shell environment for a user.
func getEnvironment(ctx context.Context, w io.Writer, userID string, environmentID string) error {
	name := fmt.Sprintf("users/%s/environments/%s", userID, environmentID)

	client, err := cloudshell.NewCloudShellClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudShellClient: %w", err)
	}
	defer client.Close()

	req := &cloudshellpb.GetEnvironmentRequest{
		Name: name,
	}

	env, err := client.GetEnvironment(ctx, req)
	if err != nil {
		return fmt.Errorf("GetEnvironment: %w", err)
	}

	fmt.Fprintf(w, "Retrieved environment: %s\nState: %s\n", env.GetName(), env.GetState())
	return nil
}

// [END cloudshell_v1_cloudshellservice_environment_get]
